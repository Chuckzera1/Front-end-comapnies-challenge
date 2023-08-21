/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeFirstLetter } from '../../../utils';
import clsx from 'clsx';
import {
  tableBody,
  tableBodyEdit,
  tableBodyRemove,
  tableBodyRowStrong,
  tableContainer,
  tableHeader,
} from './styles';
import { Company } from '../../../types/entities/company';
import { format } from 'date-fns';

interface TableProps {
  keys: string[];
  keysTitleEnum: any;
  data: any;
  className?: string;
  handleOnEdit: (data: Company) => void;
  handleOnDelete: (props: { id: string; name: string }) => Promise<void>;
}

export const Table = ({
  keys,
  keysTitleEnum,
  data,
  className,
  handleOnEdit,
  handleOnDelete,
}: TableProps) => {
  const getRowData = (key: string, value: any) => {
    if (key !== 'birthDate' || !value)
      return <td className="px-6 py-4">{value}</td>;
    return (
      <td className="px-6 py-4">{format(new Date(value), 'dd/MM/yyyy')}</td>
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
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className={tableBody}>
        {data.map((d: any) => {
          const handleOnDeleteClick = () => {
            handleOnDelete({ id: d.id, name: d.name });
          };

          const handleOnEditClick = () => {
            handleOnEdit(d);
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
              <td className="px-6 py-4 text-right">
                <button onClick={handleOnEditClick} className={tableBodyEdit}>
                  Editar
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={handleOnDeleteClick}
                  className={tableBodyRemove}>
                  Deletar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
