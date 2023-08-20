import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { mockedData } from '../Home';
import { Title } from '../../components/atoms/Title';
import { validateCep } from '../../utils';
import { Supplier } from '../../types/entities/supplier';
import { SupplierForm } from '../../components/organisms/SuppliersForm';

export type FormSupplierValues = Omit<Supplier, 'id'>;

const formSchema = yup.object().shape({
  name: yup.string().required('Nome Fantasia Obrigatório'),
  email: yup.string().email().required('Email is required'),
  document: yup.string().required('Documento é obrigatório').length(14),
  documentType: yup.mixed().oneOf(['cnpj', 'cpf']),
  rg: yup
    .string()
    .when('documentType', { is: 'cpf', then: schema => schema.required() }),
  birthDate: yup.date().required(),
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .test('Validação CEP', 'CEP Inválido', validateCep),
});

export const Suppliers = () => {
  const onSubmit = (values: FormSupplierValues) => {
    console.log('Submit: ', values);
  };

  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Fornecedores</Title>
      <div className="flex justify-between">
        <Input placeholder="Pesquisar" />
        <Dialog
          buttonLabel="Novo Usuário"
          variant="saveOrCancel"
          title="Novo usuário"
          description="Adicionar usuário">
          <SupplierForm validationSchema={formSchema} onSubmit={onSubmit} />
        </Dialog>
      </div>
      <Table keys={Object.keys(mockedData[0])} data={mockedData} />
    </div>
  );
};
