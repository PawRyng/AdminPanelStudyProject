import React from 'react';

// icons
import { ReactComponent as Trash } from "../assets/Icons/trash.svg";
import { ReactComponent as Edit } from "../assets/Icons/edit.svg";

// styles
import "../Style/Components/sceleton.scss";

interface Params {
    columnQuantity: number;
    rowsQuantity: number;
}

interface RowParams {
    columnQuantity: number;
}

const TabRowComponentSkeleton: React.FC<Params> = ({ columnQuantity, rowsQuantity }) => {

  const RowElement: React.FC<RowParams> = ({ columnQuantity }) => (
    <tr>
      {Array.from({ length: columnQuantity }).map((_, index) => (
        <td key={index}>
          <div className="text text--skeleton"></div>
        </td>
      ))}
      <td className="actions">
        <div><Edit /></div>
        <div><Trash /></div>
      </td>
    </tr>
  );

  return (
    <>
      {Array.from({ length: rowsQuantity }).map((_, index) => (
        <RowElement key={index} columnQuantity={columnQuantity} />
      ))}
    </>
  );
};

export default TabRowComponentSkeleton;
