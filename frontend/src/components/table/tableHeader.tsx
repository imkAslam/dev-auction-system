import { RxCaretSort, RxCaretUp, RxCaretDown } from "react-icons/rx";
import React from "react";

const TableHeader: React.FC = (headerGroups: any) => {
  const content = headerGroups.map((headerGroup: any) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: any) =>
        column.hideHeader === false ? null : (
          <th
            className="p-4 ali text-md font-semibold text-black font-display tracking-wide text-left"
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            <span className="flex items-center">
              {column.render("Header")}
              <span>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <RxCaretDown />
                  ) : (
                    <RxCaretUp />
                  )
                ) : (
                  <RxCaretSort />
                )}
              </span>
              {/* <RxCaretSort /> */}
            </span>
          </th>
        )
      )}
    </tr>
  ));

  return content;
};

export default TableHeader;
