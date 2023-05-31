/* eslint-disable */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { memo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import Loader from "../loader/loader";

interface TablePops {
  loading: boolean;
  data: any;
  columns: any;
  clickFun?: (value: any) => void;
}

const Table: React.FC<TablePops> = ({
  loading,
  columns,
  data,
  clickFun,
}: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      usePagination
    );

  return (
    <section className="my-2">
      <div
        className={
          loading
            ? "grid place-content-center overflow-auto rounded-lg"
            : "overflow-auto rounded-lg"
        }
      >
        {loading ? (
          <Loader />
        ) : (
          <table
            className="bg-white  border-[1px] border-[#F2F2F2] rounded-lg w-full whitespace-nowrap "
            {...getTableProps()}
          >
            <thead className=" border-b-[1px] border-[#F2F2F2]">
              <TableHeader headerGroups={headerGroups} />
            </thead>
            <tbody
              className="border-t-[1px] divide-y divide-[#F2F2F2]"
              {...getTableBodyProps()}
            >
              <TableBody
                func={clickFun}
                rowsData={rows}
                prepareRow={prepareRow}
              />
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
export default memo(Table);
