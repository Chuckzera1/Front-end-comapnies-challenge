import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormCompanyValues } from '../../../pages/Companies';
import { AnyObjectSchema } from 'yup';
import { Company } from '../../../types/entities/company';
import { Input } from '../../atoms/Input';
import { formInputStyles } from './styles';
import clsx from 'clsx';
import { defaultInputStyle } from '../../atoms/Input/styles';
import { Button } from '../../atoms/button';

type FormCompanyProps = {
  onSubmit: SubmitHandler<FormCompanyValues>;
  onCancel?: () => void;
  validationSchema: AnyObjectSchema;
  data?: Company | null;
};

export const CompanyForm = ({
  onSubmit,
  validationSchema,
  data,
}: FormCompanyProps) => {
  const defaultValues: FormCompanyValues = {
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
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-2">
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
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
