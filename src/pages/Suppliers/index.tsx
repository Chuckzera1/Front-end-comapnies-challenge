import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { Title } from '../../components/atoms/Title';
import { formatDataForCnpjSupplier, validateCep } from '../../utils';
import {
  Supplier,
  SupplierDocumentType,
  SupplierKeys,
} from '../../types/entities/supplier';
import { SupplierForm } from '../../components/organisms/SuppliersForm';
import { useCallback, useEffect, useState } from 'react';
import {
  createSupplierRoute,
  listSuppliersRoute,
  removeSupplierRoute,
  updateSupplierRoute,
} from '../../services/suppliers';
import { toast } from 'react-toastify';

export type FormSupplierValues = {
  id?: string | null;
  name: string;
  document: string;
  documentType: SupplierDocumentType;
  rg?: string | null;
  email: string;
  cep: string;
  birthDate?: Date | null;
};

const formSchema = yup.object().shape({
  name: yup.string().required('Nome Fantasia Obrigatório'),
  email: yup.string().email().optional(),
  document: yup.string().required('Documento é obrigatório'),
  documentType: yup.string().required(),
  rg: yup
    .string()
    .optional()
    .nullable()
    .when('documentType', {
      is: 'cpf',
      then: schema => schema.required().nonNullable(),
    }),
  birthDate: yup
    .date()
    .optional()
    .nullable()
    .when('documentType', {
      is: 'cpf',
      then: schema => schema.required().nonNullable(),
    }),
  cep: yup.string().required('CEP é obrigatório'),
});

export const Suppliers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Supplier[]>([]);
  const [editEntity, setEditEntity] = useState<Supplier | null>(null);

  const getSuppliersData = useCallback(async () => {
    try {
      const response = await listSuppliersRoute(searchTerm);
      setData(response);
    } catch (err) {
      setData([]);
      toast.error('Um erro ocorreu ao tentar listar as fornecedores');
    }
  }, [searchTerm]);

  const createSupplier = useCallback(
    async (values: FormSupplierValues) => {
      try {
        const isCepValid = await validateCep(values.cep);
        if (!isCepValid) {
          toast.error('CEP inválido. Por favor, preencha com um CEP válido');
          return;
        }
        const response = await createSupplierRoute(values);
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        setIsOpen(false);
        toast.success('Fornecedor criado com sucesso');
        await getSuppliersData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar editar fornecedor');
      }
    },
    [getSuppliersData],
  );

  const editSupplier = useCallback(
    async (values: FormSupplierValues) => {
      try {
        const isCepValid = await validateCep(values.cep);
        if (!isCepValid) {
          toast.error('CEP inválido. Por favor, preencha com um CEP válido');
          return;
        }
        const valuesWithRightData = formatDataForCnpjSupplier(values);
        if (!editEntity) return;
        const response = await updateSupplierRoute(
          editEntity?.id,
          valuesWithRightData,
        );
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        setEditEntity(null);
        setIsOpen(false);
        toast.success('Fornecedor editado com sucesso');
        await getSuppliersData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar criar fornecedor');
        setEditEntity(null);
        setIsOpen(false);
      }
    },
    [getSuppliersData, editEntity],
  );

  const handleOnEdit = useCallback((values: Supplier) => {
    if (!values.birthDate) {
      setEditEntity(values);
      setIsOpen(true);
      return;
    }
    const valuesWithCorrectDateFormat: Supplier = {
      ...values,
      birthDate: new Date(values.birthDate),
    };
    setEditEntity(valuesWithCorrectDateFormat);
    setIsOpen(true);
  }, []);

  const removeSupplier = useCallback(
    async ({ id, name }: { id: string; name: string }) => {
      try {
        await removeSupplierRoute(id);
        await getSuppliersData();
      } catch (error) {
        toast(`Error ao tentar deletar a empresa: ${name}`);
      }
    },
    [getSuppliersData],
  );

  const onCancel = useCallback(() => {
    setEditEntity(null);
    setIsOpen(false);
  }, []);

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
          title={editEntity ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          description={
            editEntity
              ? 'Altere as informações do Fornecedor'
              : 'Adicionar Fornecedor'
          }
          onCancel={onCancel}>
          <SupplierForm
            data={editEntity}
            validationSchema={formSchema}
            onSubmit={createSupplier}
            onEdit={editSupplier}
          />
        </Dialog>
      </div>
      <Table
        keys={Object.keys(SupplierKeys)}
        keysTitleEnum={SupplierKeys}
        data={data}
        handleOnDelete={removeSupplier}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
};
