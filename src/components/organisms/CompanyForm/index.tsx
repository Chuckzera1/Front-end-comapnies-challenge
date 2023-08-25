import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormCompanyValues } from '../../../pages/Companies';
import { AnyObjectSchema } from 'yup';
import { Input } from '../../atoms/Input';
import { formInputStyles } from './styles';
import clsx from 'clsx';
import { defaultInputStyle } from '../../atoms/Input/styles';
import { Button } from '../../atoms/button';
import { CompanyDTO } from '../../../types/DTO/company';
import { Table } from '../../molecules/Table';
import { EditCompanySuppliersKeys } from '../../../types/entities/company';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { listSuppliersRoute } from '../../../services/suppliers';
import { toast } from 'react-toastify';
import { Supplier } from '../../../types/entities/supplier';
import { vinculateSupplierToCompanyRoute } from '../../../services/company';

type FormCompanyProps = {
  onSubmit: SubmitHandler<FormCompanyValues>;
  onEdit: SubmitHandler<FormCompanyValues>;
  validationSchema: AnyObjectSchema;
  data?: CompanyDTO | null;
  companySuppliersIds?: Supplier['id'][];
};

export const CompanyForm = ({
  onSubmit,
  onEdit,
  validationSchema,
  data,
  companySuppliersIds = [],
}: FormCompanyProps) => {
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const suppliersNotRelated = useMemo(
    () => supplierData.filter(({ id }) => !companySuppliersIds.includes(id)),
    [companySuppliersIds, supplierData],
  );

  const getSuppliersData = useCallback(async () => {
    try {
      const response = await listSuppliersRoute(searchTerm);
      setSupplierData(response);
    } catch (err) {
      setSupplierData([]);
      toast.error('Um erro ocorreu ao tentar listar as fornecedores');
    }
  }, [searchTerm]);

  const vinculateToCompany = useCallback(
    async (supplierId: string) => {
      if (!data?.id) return;
      try {
        await vinculateSupplierToCompanyRoute(data?.id, supplierId);
        toast.success('Vinculado com sucesso');
        companySuppliersIds.push(supplierId);
        getSuppliersData();
      } catch {
        toast.error('Um erro ocorreu ao tentar víncular fornecedor à empresa');
      }
    },
    [data?.id],
  );

  const defaultValues: FormCompanyValues = {
    id: undefined,
    tradeName: '',
    document: '',
    cep: '',
    ...data,
  };

  const methods = useForm<FormCompanyValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { register, handleSubmit, getFieldState } = methods;

  useEffect(() => {
    getSuppliersData();
  }, [getSuppliersData]);
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={data?.id ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
          className="mt-2 space-y-2 flex flex-col gap-3">
          <fieldset>
            <label
              htmlFor="tradeName"
              className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Nome Fantasia
            </label>
            <Input
              id="tradeName"
              type="text"
              placeholder="Nome Fantasia"
              className={clsx(
                'mt-1 block rounded-md py-2 w-full',
                defaultInputStyle,
                formInputStyles,
              )}
              error={getFieldState('tradeName').error?.message}
              {...register('tradeName')}
            />
          </fieldset>
          <div className="flex flex-row justify-between">
            <fieldset>
              <label
                htmlFor="cnpj"
                className="text-xs font-medium text-gray-700 dark:text-gray-400">
                Cnpj
              </label>
              <Input
                id="cnpj"
                type="text"
                placeholder="CNPJ"
                mask="99.999.999/9999-99"
                className={clsx(
                  'mt-1 block rounded-md py-2',
                  defaultInputStyle,
                  formInputStyles,
                )}
                error={getFieldState('document').error?.message}
                {...register('document')}
                required
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="cep"
                className="text-xs font-medium text-gray-700 dark:text-gray-400">
                CEP
              </label>
              <Input
                id="cep"
                type="text"
                placeholder="CEP"
                mask="99999-999"
                className={clsx(
                  'mt-1 block rounded-md py-2',
                  defaultInputStyle,
                  formInputStyles,
                )}
                error={getFieldState('cep').error?.message}
                {...register('cep')}
                required
              />
            </fieldset>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
      {data?.id && (
        <div className="flex flex-col gap-5 w-full">
          <p className="font-medium">Vincular Fornecedor</p>
          <Input
            placeholder="Pesquisar"
            className={clsx(defaultInputStyle, 'border')}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Table
            keys={Object.keys(EditCompanySuppliersKeys)}
            keysTitleEnum={EditCompanySuppliersKeys}
            data={suppliersNotRelated}
            handleCompanyRelate={vinculateToCompany}
          />
        </div>
      )}
    </>
  );
};
