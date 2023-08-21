import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { Title } from '../../components/atoms/Title';
import { CompanyForm } from '../../components/organisms/CompanyForm';
import { validateCep } from '../../utils';
import { Company, CompanyKeysEnum } from '../../types/entities/company';
import {
  listCompaniesRoute,
  createCompanyRoute,
  removeCompanyRoute,
  updateCompanyRoute,
} from '../../services/company';
import { useCallback, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export type FormCompanyValues = {
  tradeName: string;
  document: string;
  cep: string;
};

const formSchema = yup.object().shape({
  tradeName: yup.string().required('Nome Fantasia Obrigatório'),
  document: yup.string().required('Documento é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
});

export const Companies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState<Company[]>([]);

  const getCompaniesData = useCallback(async () => {
    try {
      const response = await listCompaniesRoute(searchTerm);
      setData(response);
    } catch (err) {
      setData([]);
      toast.error('Um erro ocorreu ao tentar listar as empresas');
    }
  }, [searchTerm]);

  const createCompany = useCallback(
    async (values: Omit<Company, 'id'>) => {
      try {
        const response = await createCompanyRoute(values);
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        setIsOpen(false);
        await getCompaniesData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar criar empresa');
      }
    },
    [getCompaniesData],
  );

  const editCompany = useCallback(
    async (values: Omit<Company, 'id'>) => {
      try {
        if (!editEntity) return;
        const response = await updateCompanyRoute(editEntity?.id, values);
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        setEditEntity(null);
        setIsOpen(false);
        await getCompaniesData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar criar empresa');
        setEditEntity(null);
        setIsOpen(false);
      }
    },
    [getCompaniesData, editEntity],
  );

  const onSubmit = async (values: FormCompanyValues) => {
    const isCepValid = await validateCep(values.cep);
    if (!isCepValid) {
      console.log('inválido');
      toast.error('CEP inválido! Por favor, verifique o CEP');
      return;
    }
    if (!editEntity) return createCompany(values);
    return editCompany(values);
  };

  const removeCompany = useCallback(
    async ({ id, name }: { id: string; name: string }) => {
      try {
        await removeCompanyRoute(id);
        await getCompaniesData();
      } catch (error) {
        toast(`Error ao tentar deletar a empresa: ${name}`);
      }
    },
    [getCompaniesData],
  );

  const handleOnEdit = useCallback((values: Company) => {
    setEditEntity(values);
    setIsOpen(true);
  }, []);

  const onCancel = useCallback(() => {
    setEditEntity(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    getCompaniesData();
  }, [getCompaniesData]);

  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Empresas</Title>
      <div className="flex justify-between">
        <div className="flex flex-row">
          <Input
            placeholder="Pesquisar"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Dialog
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            buttonLabel="Nova Empresa"
            variant="saveOrCancel"
            title="Nova Empresa"
            description="Adicionar Empresa"
            onCancel={onCancel}>
            <CompanyForm
              onSubmit={onSubmit}
              validationSchema={formSchema}
              data={editEntity}
              onCancel={onCancel}
            />
          </Dialog>
        </div>
      </div>
      <Table
        keys={Object.keys(CompanyKeysEnum)}
        keysTitleEnum={CompanyKeysEnum}
        data={data}
        handleOnDelete={props => removeCompany(props)}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
};
