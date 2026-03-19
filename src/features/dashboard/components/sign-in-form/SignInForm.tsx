"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppError } from "@/lib/app-error";

import { useAuthStore } from "@/stores/auth.store";

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
import { useSignIn } from "@/features/dashboard/hooks/use-sign-in";
import { SignInSchema, type SignInValues } from "@/features/dashboard/schemas/auth.schema";

export function SignInForm() {
  const router = useRouter();
  const signInMutation = useSignIn();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const session = useAuthStore((state) => state.session);

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (hasHydrated && session?.accessToken) {
      router.replace("/dashboard/me");
    }
  }, [hasHydrated, router, session?.accessToken]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await signInMutation.mutateAsync(values);
      toast.success("Signed in successfully.");
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError("Sign in failed.");
      toast.error(appError.message);
    }
  });

  return (
    <Card className="w-full max-w-md border-border/80 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Sign in with your email and password to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
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
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={signInMutation.isPending}>
              {signInMutation.isPending && (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              )}
              <span>Sign In</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
