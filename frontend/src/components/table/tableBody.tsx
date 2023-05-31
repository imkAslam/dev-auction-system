import React from "react";

const TableBody: React.FC = ({ rowsData, prepareRow }: any) =>
  rowsData.map((row: any) => {
    prepareRow(row);
    return (
      <tr className="" {...row.getRowProps()}>
        {row?.cells?.map((cell: any) => (
          <td
            className="px-4 py-4 whitespace-nowrap text-base text-[#4D4D4D] font-display font-normal "
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </td>
        ))}
      </tr>
    );
  });

export default TableBody;
