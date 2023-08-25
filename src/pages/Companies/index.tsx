import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { Title } from '../../components/atoms/Title';
import { CompanyForm } from '../../components/organisms/CompanyForm';
import { validateCep } from '../../utils';
import { Company, CompanyKeys } from '../../types/entities/company';
import {
  listCompaniesRoute,
  createCompanyRoute,
  removeCompanyRoute,
  updateCompanyRoute,
} from '../../services/company';
import { useCallback, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CompanyDTO } from '../../types/DTO/company';
import { Supplier } from '../../types/entities/supplier';

export type FormCompanyValues = {
  id?: string;
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
  const [editEntity, setEditEntity] = useState<CompanyDTO | null>(null);
  const [companySuppliersId, setCompanySuppliersId] = useState<
    Supplier['id'][]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState<Company[]>([]);

  const onCloseDialog = useCallback(() => {
    setEditEntity(null);
    setCompanySuppliersId([]);
    setIsOpen(false);
  }, []);

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
    async (values: Omit<CompanyDTO, 'id'>) => {
      try {
        const isCepValid = await validateCep(values.cep);
        if (!isCepValid) {
          toast.error('CEP inválido! Por favor, verifique o CEP');
          return;
        }

        const response = await createCompanyRoute(values);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
          return;
        }

        setIsOpen(false);
        toast.success('Empresa criada com sucesso');
        await getCompaniesData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar criar empresa');
      }
    },
    [getCompaniesData],
  );

  const editCompany = useCallback(
    async (values: CompanyDTO) => {
      try {
        const isCepValid = await validateCep(values.cep);
        if (!isCepValid) {
          toast.error('CEP inválido! Por favor, verifique o CEP');
          return;
        }
        if (!editEntity?.id) {
          toast.error('Um erro ocorreu ao tentar editar. Tente novamente');
          onCloseDialog();
          return;
        }

        if (!editEntity) return;

        const response = await updateCompanyRoute(editEntity.id, values);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        onCloseDialog();
        toast.success('Empresa editada com sucesso');
        await getCompaniesData();
      } catch (err) {
        toast.error('Um erro ocorreu ao tentar editar empresa');
        onCloseDialog();
      }
    },
    [editEntity, getCompaniesData, onCloseDialog],
  );

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
    setCompanySuppliersId(values.suppliers.map(({ id }) => id));
    setIsOpen(true);
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
            title={editEntity ? 'Editar Empresa' : 'Nova Empresa'}
            description={
              editEntity ? 'Altere os dados da Empresa' : 'Adicionar Empresa'
            }
            onCancel={onCloseDialog}>
            <CompanyForm
              onSubmit={createCompany}
              onEdit={editCompany}
              refresh={getCompaniesData}
              validationSchema={formSchema}
              data={editEntity}
              companySuppliersIds={companySuppliersId}
            />
          </Dialog>
        </div>
      </div>
      <Table
        keys={Object.keys(CompanyKeys)}
        keysTitleEnum={CompanyKeys}
        data={data}
        handleOnDelete={removeCompany}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
};
