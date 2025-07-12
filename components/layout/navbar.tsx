import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { NavbarProps } from "@/lib/types";

// TODO: incorporate with auth

export function Navbar({ isAuth = true }: NavbarProps) {
  return (
    <nav className="border-b bg-white sticky top-0 z-[100]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-xl font-semibold text-gray-900">Guest Tracker</h1>
        </Link>

        {isAuth && (
          <div className="flex items-center gap-2 sm:gap-4">
            <p className="hidden md:block text-sm text-gray-600">
              sarah.miller@email.com
            </p>

            <Button variant="outline" className="text-sm rounded-full">
              Log out
            </Button>

            <Avatar className="size-10">
              <AvatarImage src="/avatar.jpg" alt="Sarah Miller" />
              <AvatarFallback>Hi</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </nav>
  );
}
