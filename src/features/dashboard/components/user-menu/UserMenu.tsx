"use client";

import { useState } from "react";
import Image from "next/image";

import { LogOut } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/ui";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useLogout } from "@/features/auth/hooks/use-logout";

const getInitials = (username: string): string =>
  username
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value.charAt(0).toUpperCase())
    .join("");

export function UserMenu() {
  const { data: user, isPending } = useCurrentUser();
  const logoutMutation = useLogout();
  const [brokenImageSrc, setBrokenImageSrc] = useState<string | null>(null);

  if (isPending) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" aria-hidden="true" />;
  }

  if (!user) {
    return null;
  }

  const initials = getInitials(user.username);
  const showImage = user.image !== "" && brokenImageSrc !== user.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-11 gap-3 px-3">
          <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {showImage ? (
              <Image
                src={user.image}
                alt={user.username}
                className="object-cover"
                fill
                onError={() => setBrokenImageSrc(user.image)}
                unoptimized
              />
            ) : (
              <span>{initials}</span>
            )}
          </span>
          <span className="max-w-32 truncate text-left text-sm font-medium">{user.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-1">
          <div className="truncate text-sm font-medium">{user.username}</div>
          <div className="truncate text-xs font-normal text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            logoutMutation.mutate();
          }}
          disabled={logoutMutation.isPending}
          variant="destructive"
        >
          <LogOut className="size-4" aria-hidden="true" />
          <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
