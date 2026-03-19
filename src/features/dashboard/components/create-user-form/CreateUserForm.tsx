"use client";

import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppError, toAppError } from "@/lib/app-error";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@/ui";
import { useCreateUser } from "@/features/dashboard/hooks/use-create-user";
import {
  CreateUserFormSchema,
  type CreateUserFormValues
} from "@/features/dashboard/schemas/create-user.schema";

const defaultValues: CreateUserFormValues = {
  username: "",
  email: "",
  password: "",
  bio: "",
  image: ""
};

type CreateUserFormProps = {
  onCancel: () => void;
  onCreated: () => void;
};

const isCreateUserFieldName = (value: string): value is keyof CreateUserFormValues => {
  switch (value) {
    case "username":
    case "email":
    case "password":
    case "bio":
    case "image":
      return true;
    default:
      return false;
  }
};

export function CreateUserForm({ onCancel, onCreated }: CreateUserFormProps) {
  const createUserMutation = useCreateUser();
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues
  });

  const applyServerFieldErrors = (error: unknown): boolean => {
    if (!axios.isAxiosError(error)) {
      return false;
    }

    const responseData = error.response?.data;

    if (
      typeof responseData !== "object" ||
      responseData === null ||
      !("errors" in responseData) ||
      typeof responseData.errors !== "object" ||
      responseData.errors === null
    ) {
      return false;
    }

    let hasMappedError = false;

    for (const [fieldName, fieldError] of Object.entries(responseData.errors)) {
      if (!isCreateUserFieldName(fieldName)) {
        continue;
      }

      const message =
        typeof fieldError === "string"
          ? fieldError
          : Array.isArray(fieldError)
            ? fieldError.find((value) => typeof value === "string")
            : undefined;

      if (!message) {
        continue;
      }

      form.setError(fieldName, {
        type: "server",
        message
      });
      hasMappedError = true;
    }

    return hasMappedError;
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createUserMutation.mutateAsync(values);
      form.reset(defaultValues);
      onCreated();
      toast.success("User created successfully.");
    } catch (error) {
      if (applyServerFieldErrors(error)) {
        toast.error("Please review the highlighted fields.");
        return;
      }

      const appError = error instanceof AppError ? error : toAppError(error);

      toast.error(appError.message || "Failed to create user.");
    }
  });

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Create User</CardTitle>
        <CardDescription>Add a new user account to the dashboard directory.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input autoComplete="username" placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input placeholder="Short profile description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={createUserMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createUserMutation.isPending}>
                {createUserMutation.isPending && (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                )}
                <span>Create User</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
