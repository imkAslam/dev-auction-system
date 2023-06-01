import type { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
}
