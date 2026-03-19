"use client";

import { useState } from "react";

import { ArrowDownAZ, ArrowUpAZ, Plus } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/ui";
import { CreateUserForm } from "@/features/dashboard/components/create-user-form";
import { useUsers } from "@/features/dashboard/hooks/use-users";
import { type UsersListParams } from "@/features/dashboard/schemas/user.schema";

const defaultParams: UsersListParams = {
  limit: 10,
  page: 1,
  order: "ASC"
};

export function UsersTable() {
  const [params, setParams] = useState<UsersListParams>(defaultParams);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { data, isPending, isError, error } = useUsers(params);

  const pagination = data?.pagination;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            View the user list with pagination and create new accounts.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => setIsCreateFormOpen((current) => !current)}>
            <Plus className="size-4" aria-hidden="true" />
            <span>{isCreateFormOpen ? "Close Form" : "Create User"}</span>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setParams((current) => ({
                ...current,
                order: current.order === "ASC" ? "DESC" : "ASC",
                page: 1
              }))
            }
          >
            {params.order === "ASC" ? (
              <ArrowUpAZ className="size-4" aria-hidden="true" />
            ) : (
              <ArrowDownAZ className="size-4" aria-hidden="true" />
            )}
            <span>Order: {params.order}</span>
          </Button>
        </div>
      </div>

      {isCreateFormOpen && (
        <CreateUserForm
          onCancel={() => setIsCreateFormOpen(false)}
          onCreated={() => setIsCreateFormOpen(false)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Users Directory</CardTitle>
          <CardDescription>
            {pagination
              ? `${pagination.totalRecords} records, ${pagination.totalPages} pages`
              : "Loading user data."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Loading users...
                    </TableCell>
                  </TableRow>
                )}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-destructive">
                      {error instanceof Error ? error.message : "An error occurred."}
                    </TableCell>
                  </TableRow>
                )}
                {!isPending &&
                  !isError &&
                  data?.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                {!isPending && !isError && !data?.data.length && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
            <div className="text-muted-foreground">
              Page {pagination?.currentPage ?? params.page} / {pagination?.totalPages ?? 1}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setParams((current) => ({
                    ...current,
                    page: Math.max(1, current.page - 1)
                  }))
                }
                disabled={!pagination?.previousPage || isPending}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setParams((current) => ({
                    ...current,
                    page: pagination?.nextPage ?? current.page
                  }))
                }
                disabled={!pagination?.nextPage || isPending}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
