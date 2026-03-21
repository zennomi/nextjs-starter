"use client";

import { useMemo, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui";

type ShowcaseUser = {
  id: number;
  name: string;
  email: string;
};

const DEMO_USERS: ShowcaseUser[] = [
  { id: 1, name: "Alex Rivera", email: "alex@example.com" },
  { id: 2, name: "Sam Chen", email: "sam@example.com" },
  { id: 3, name: "Jordan Lee", email: "jordan@example.com" },
  { id: 4, name: "Riley Patel", email: "riley@example.com" },
  { id: 5, name: "Casey Morgan", email: "casey@example.com" }
];

export function UserList() {
  const data = DEMO_USERS;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const columns = useMemo<ColumnDef<ShowcaseUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 [&_svg]:size-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown />
          </button>
        )
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 [&_svg]:size-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </button>
        )
      },
      {
        accessorKey: "email",
        header: () => <span>Email</span>,
        enableSorting: false,
        cell: ({ row }) => <div className="lowercase">{row.getValue<string>("email")}</div>
      }
    ],
    []
  );

  /**
   * @remarks
   * We suppress `react-hooks/incompatible-library` because TanStack Table's `useReactTable`
   * is a valid hook but might trigger this rule due to version mismatch or specific lint configuration.
   */
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, globalFilter }
  });

  return (
    <section className="col-span-3 lg:col-span-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search users..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-56"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
