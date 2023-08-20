import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { mockedData } from '../Home';
import { Title } from '../../components/atoms/Title';
import { CompanyForm } from '../../components/organisms/CompanyForm';
import { validateCep } from '../../utils';

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
  const onSubmit = (values: FormCompanyValues) => {
    validateCep(values.cep);
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Empresas</Title>
      <div className="flex justify-between">
        <div>
          <Input placeholder="Pesquisar" />
        </div>
        <div>
          <Dialog
            buttonLabel="Novo Usuário"
            variant="saveOrCancel"
            title="Novo usuário"
            description="Adicionar usuário">
            <CompanyForm onSubmit={onSubmit} validationSchema={formSchema} />
          </Dialog>
        </div>
      </div>
      <Table keys={Object.keys(mockedData[0])} data={mockedData} />
    </div>
  );
};
