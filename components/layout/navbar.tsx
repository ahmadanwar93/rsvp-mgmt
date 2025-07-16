"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarProps } from "@/lib/types";
import { useSession, signOut } from "next-auth/react";

// TODO: check if it is possible to convert into a server component

export function Navbar({ isAuth = true }: NavbarProps) {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <nav className="border-b bg-white sticky top-0 z-[100]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-xl font-semibold text-gray-900">Guest Tracker</h1>
        </Link>

        {isAuth && (
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span>
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <Button onClick={() => signOut()} className="rounded-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 rounded-full"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
