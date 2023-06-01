import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableProps } from "./table.interface";

export const Table = <T extends object>({
  data,
  columns,
  loading = false,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <section className="my-2">
      <div
        className={
          loading
            ? "grid place-content-center overflow-auto rounded-lg"
            : "overflow-auto rounded-lg"
        }
      >
        <table className="bg-white  border-[1px] border-[#F2F2F2] rounded-lg w-full whitespace-nowrap">
          <thead className=" border-b-[1px] border-[#F2F2F2]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="p-4 ali text-md font-semibold text-black font-display tracking-wide text-left"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="border-t-[1px] divide-y divide-[#F2F2F2]">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-4 py-4 whitespace-nowrap text-base text-[#4D4D4D] font-display font-normal"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default Table;
