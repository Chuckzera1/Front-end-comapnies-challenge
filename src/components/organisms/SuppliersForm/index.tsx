import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from 'react-hook-form';
import { FormSupplierValues } from '../../../pages/Suppliers';
import { AnyObjectSchema } from 'yup';
import { Supplier } from '../../../types/entities/supplier';
import { Input } from '../../atoms/Input';
import { formInputStyles } from './styles';
import clsx from 'clsx';
import { defaultInputStyle } from '../../atoms/Input/styles';
import { CheckBox } from '../../atoms/checkbox';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type FormSupplierProps = {
  onSubmit: SubmitHandler<FormSupplierValues>;
  validationSchema: AnyObjectSchema;
  data?: Supplier;
};

export const SupplierForm = ({
  onSubmit,
  validationSchema,
  data,
}: FormSupplierProps) => {
  const defaultValues: FormSupplierValues = {
    name: '',
    document: '',
    documentType: 'cnpj',
    birthDate: new Date(),
    email: '',
    rg: undefined,
    cep: '',
    ...data,
  };
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { register, handleSubmit, watch, control } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            {...register('tradeName')}
            required
          />
        </fieldset>
        <div className="flex flex-row">
          <fieldset>
            <CheckBox
              label="CNPJ"
              id="cnpj"
              value="cnpj"
              {...register('documentType')}
            />
          </fieldset>
          <fieldset>
            <CheckBox
              label="CPF"
              id="cpf"
              value="cpf"
              {...register('documentType')}
            />
          </fieldset>
        </div>
        <div className="flex flex-col">
          {watch('documentType') === 'cnpj' && (
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
                {...register('document')}
                required
              />
            </fieldset>
          )}
          {watch('documentType') === 'cpf' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <fieldset>
                  <label
                    htmlFor="cpf"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400">
                    CPF
                  </label>

                  <Input
                    id="cpf"
                    type="text"
                    placeholder="CPF"
                    mask="999.999.999-99"
                    className={clsx(
                      'mt-1 block rounded-md py-2',
                      defaultInputStyle,
                      formInputStyles,
                    )}
                    {...register('document')}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label
                    htmlFor="rg"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400">
                    RG
                  </label>

                  <Input
                    id="rg"
                    type="text"
                    placeholder="RG"
                    mask="99.999.999-9"
                    className={clsx(
                      'mt-1 block rounded-md py-2',
                      defaultInputStyle,
                      formInputStyles,
                    )}
                    {...register('document')}
                    required
                  />
                </fieldset>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="birthDate"
                  className="text-xs font-medium text-gray-700 dark:text-gray-400">
                  Data de nascimento
                </label>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <ReactDatePicker
                      id="birthDate"
                      className={clsx(
                        'mt-1 block rounded-md py-2',
                        defaultInputStyle,
                        formInputStyles,
                      )}
                      placeholderText="Select date"
                      onChange={date => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
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
            {...register('tradeName')}
            required
          />
        </fieldset>
      </form>
    </FormProvider>
  );
};
