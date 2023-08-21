import * as yup from 'yup';
import { Input } from '../../components/atoms/Input';
import { Dialog } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { Title } from '../../components/atoms/Title';
import { validateCep } from '../../utils';
import { Supplier, SupplierKeys } from '../../types/entities/supplier';
import { SupplierForm } from '../../components/organisms/SuppliersForm';
import { useState } from 'react';

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

  const onSubmit = async (values: FormSupplierValues) => {
    const isCepValid = await validateCep(values.cep);
    console.log(isCepValid);
    console.log(values);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Fornecedores</Title>
      <div className="flex justify-between">
        <Input placeholder="Pesquisar" />
        <Dialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buttonLabel="Novo Usuário"
          variant="saveOrCancel"
          title="Novo usuário"
          description="Adicionar usuário">
          <SupplierForm validationSchema={formSchema} onSubmit={onSubmit} />
        </Dialog>
      </div>
      <Table
        keys={Object.keys(SupplierKeys)}
        keysTitleEnum={SupplierKeys}
        data={[]}
        handleOnDelete={async props => {
          console.log(props);
        }}
        handleOnEdit={() => {}}
      />
    </div>
  );
};
