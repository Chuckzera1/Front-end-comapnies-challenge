/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeFirstLetter } from '../../../utils';
import clsx from 'clsx';
import {
  tableBody,
  tableBodyEdit,
  tableBodyRelate,
  tableBodyRemove,
  tableBodyRowStrong,
  tableContainer,
  tableHeader,
} from './styles';
import { format } from 'date-fns';
import { Supplier } from '../../../types/entities/supplier';

interface TableProps {
  keys: string[];
  keysTitleEnum: any;
  data: any;
  className?: string;
  handleOnEdit?: (data: any) => void;
  handleOnDelete?: (props: { id: string; name: string }) => Promise<void>;
  handleCompanyRelate?: (supplierId: string) => Promise<void>;
}

export const Table = ({
  keys,
  keysTitleEnum,
  data,
  className,
  handleOnEdit,
  handleOnDelete,
  handleCompanyRelate,
}: TableProps) => {
  const getRowData = (key: string, value: any) => {
    if (key == 'birthDate' && value)
      return (
        <td className="px-6 py-4 flex-wrap overflow-hidden text-ellipsis">
          {format(new Date(value), 'dd/MM/yyyy')}
        </td>
      );
    if (key == 'suppliers')
      return (
        <td className="px-6 py-4 flex flex-wrap">
          {value.map(({ name }: Supplier) => `${name}, `)}
        </td>
      );

    return (
      <td className="px-6 py-4 max-w-[200px] flex-wrap overflow-hidden text-ellipsis">
        {value}
      </td>
    );
  };
  return (
    <table className={clsx(tableContainer, className)}>
      <thead className={tableHeader}>
        <tr>
          {keys.map(key => (
            <th scope="col" className="px-6 py-3">
              {capitalizeFirstLetter(keysTitleEnum[key])}
            </th>
          ))}
          {handleOnEdit && <th scope="col" className="px-6 py-3"></th>}
          {handleOnDelete && <th scope="col" className="px-6 py-3"></th>}
          {handleCompanyRelate && <th scope="col" className="px-6 py-3"></th>}
        </tr>
      </thead>
      <tbody className={tableBody}>
        {data.map((d: any) => {
          const handleOnDeleteClick = () => {
            if (!handleOnDelete) return;
            handleOnDelete({ id: d.id, name: d.name });
          };

          const handleOnEditClick = () => {
            if (!handleOnEdit) return;
            handleOnEdit(d);
          };

          const handleCompanyRelateClick = () => {
            if (!handleCompanyRelate) return;
            handleCompanyRelate(d.id);
          };
          return (
            <tr key={d.id}>
              {keys.map((key, index) =>
                index === 0 ? (
                  <th scope="row" className={tableBodyRowStrong}>
                    {d[key]}
                  </th>
                ) : (
                  getRowData(key, d[key])
                ),
              )}
              {handleOnEdit && (
                <td className="px-6 py-4 text-right">
                  <button onClick={handleOnEditClick} className={tableBodyEdit}>
                    Editar
                  </button>
                </td>
              )}

              {handleOnDelete && (
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={handleOnDeleteClick}
                    className={tableBodyRemove}>
                    Deletar
                  </button>
                </td>
              )}

              {handleCompanyRelate && (
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={handleCompanyRelateClick}
                    className={tableBodyRelate}>
                    Víncular
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
