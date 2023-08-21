import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { Title } from '../../components/atoms/Title';
import { validateCep } from '../../utils';
import { Supplier, SupplierKeys } from '../../types/entities/supplier';
import { SupplierForm } from '../../components/organisms/SuppliersForm';
import { useCallback, useEffect, useState } from 'react';
import {
  createSupplierRoute,
  listSuppliersRoute,
} from '../../services/suppliers';
import { toast } from 'react-toastify';

export type FormSupplierValues = Omit<Supplier, 'id'>;

const formSchema = yup.object().shape({
  name: yup.string().required('Nome Fantasia Obrigatório'),
  email: yup.string().email().optional(),
  document: yup.string().required('Documento é obrigatório'),
  documentType: yup.mixed().oneOf(['cnpj', 'cpf']),
  rg: yup
    .string()
    .optional()
    .when('documentType', { is: 'cpf', then: schema => schema.required() }),
  birthDate: yup
    .date()
    .optional()
    .when('documentType', { is: 'cpf', then: schema => schema.required() }),
  cep: yup.string().required('CEP é obrigatório'),
});

export const Suppliers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Supplier[]>([]);

  const getSuppliersData = useCallback(async () => {
    try {
      const response = await listSuppliersRoute(searchTerm);
      setData(response);
    } catch (err) {
      setData([]);
      toast.error('Um erro ocorreu ao tentar listar as empresas');
    }
  }, [searchTerm]);

  const createSupplier = useCallback(
    async (values: Omit<Supplier, 'id'>) => {
      try {
        const response = await createSupplierRoute(values);
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        setIsOpen(false);
        await getSuppliersData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar criar empresa');
      }
    },
    [getSuppliersData],
  );

  const onSubmit = async (values: FormSupplierValues) => {
    const isCepValid = await validateCep(values.cep);
    if (!isCepValid) {
      toast.error('CEP inválido. Por favor, preencha com um CEP válido');
      return;
    }
    await createSupplier(values);
  };

  useEffect(() => {
    getSuppliersData();
  }, [getSuppliersData]);

  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Fornecedores</Title>
      <div className="flex justify-between">
        <Input
          placeholder="Pesquisar"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Dialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buttonLabel="Novo Fornecedor"
          variant="saveOrCancel"
          title="Novo usuário"
          description="Adicionar Fornecedor">
          <SupplierForm validationSchema={formSchema} onSubmit={onSubmit} />
        </Dialog>
      </div>
      <Table
        keys={Object.keys(SupplierKeys)}
        keysTitleEnum={SupplierKeys}
        data={data}
        handleOnDelete={async props => {
          console.log(props);
        }}
        handleOnEdit={() => {}}
      />
    </div>
  );
};
