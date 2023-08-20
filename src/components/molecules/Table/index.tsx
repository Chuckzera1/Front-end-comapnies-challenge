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

interface TableProps {
  keys: string[];
  data: any[];
  className?: string;
  handleOnEdit?: () => void;
  handleOnDelete?: () => void;
}

export const Table = ({
  keys,
  data,
  className,
  handleOnEdit,
  handleOnDelete,
}: TableProps) => {
  return (
    <table className={clsx(tableContainer, className)}>
      <thead className={tableHeader}>
        <tr>
          {keys.map(key => (
            <th scope="col" className="px-6 py-3">
              {capitalizeFirstLetter(key)}
            </th>
          ))}
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className={tableBody}>
        {data.map((d: any) => (
          <tr>
            {keys.map((key, index) =>
              index === 0 ? (
                <th scope="row" className={tableBodyRowStrong}>
                  {d[key]}
                </th>
              ) : (
                <td className="px-6 py-4">{d[key]}</td>
              ),
            )}
            <td className="px-6 py-4 text-right">
              <button onClick={handleOnEdit} className={tableBodyEdit}>
                Editar
              </button>
            </td>
            <td className="px-6 py-4 text-right">
              <button onClick={handleOnDelete} className={tableBodyRemove}>
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
