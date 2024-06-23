"use client";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo.svg";
import { montserrat, ubuntu } from "@/app/fonts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FC, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export function Navbar() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const handleSignout = () => {
    router.push("/");
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 absolute">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <div className="lg:hidden flex w-full justify-end">
          <Image src={logo} alt="company logo" width={60} height={60} />
        </div>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {/* Mobile */}
          {!isSignedIn ? (
            <div className="grid gap-2 py-6">
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/"
              >
                About
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/contact"
              >
                Bussiness
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/about"
              >
                Blog
              </Link>

              <div className="flex flex-col gap-4 my-4">
                <SignedOut>
                  <Link href="/sign-in">
                    <Button className="rounded-full bg-red-1 text-base hover:bg-red-2 w-full">
                      Log in
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button className="rounded-full text-black bg-slate-200 text-base hover:bg-slate-300 w-full">
                      Sign up
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </div>
          ) : (
            <div className="grid gap-2 py-6">
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/home"
              >
                Home
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/explore"
              >
                Explore
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/create"
              >
                Create
              </Link>

              <div className="flex flex-col gap-4 my-4">
                <SignedIn>
                  <SignOutButton>
                    <Button
                      className="rounded-full bg-red-1 text-base hover:bg-red-2 w-full"
                      onClick={handleSignout}
                    >
                      Sign out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Link
        className={cn("mr-2 hidden lg:flex", {
          "mr-4": isSignedIn,
        })}
        href="/"
      >
        <MountainIcon className="h-6 w-6" />
        {!isSignedIn && (
          <h2 className={`${ubuntu.className} text-xl mx-2 text-red-1`}>
            Nomadland
          </h2>
        )}
      </Link>
      <nav className="hidden lg:flex">
        {!isSignedIn ? (
          <>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Today
            </Link>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Watch
            </Link>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Explore
            </Link>
          </>
        ) : (
          <>
            {navbarLinks.map(({ route, label }) => {
              const isActive =
                pathname === route || pathname.startsWith(`${route}/`);
              return (
                <Link
                  key={label}
                  href={route}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-base font-medium transition-colors focus:bg-black focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                    { "bg-black text-white": isActive }
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
      <nav className="ml-auto hidden lg:flex gap-2 items-center">
        {!isSignedIn ? (
          <>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              About
            </Link>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Bussiness
            </Link>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Blog
            </Link>
          </>
        ) : (
          <div className="flex flex-row space-x-3 mx-4">
            <HoverCard>
              <HoverCardTrigger>
                <Image
                  src="/icons/bell.svg"
                  width={40}
                  height={40}
                  alt="notification"
                  className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                This feature will be available soon
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Image
                  src="/icons/message.svg"
                  width={40}
                  height={40}
                  alt="notification"
                  className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                This feature will be available soon
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
        <div className="space-x-2">
          <SignedOut>
            <Link href="/sign-in">
              <Button className="rounded-full bg-red-1 text-base hover:bg-red-2">
                Log in
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="rounded-full text-black bg-slate-200 text-base hover:bg-slate-300">
                Sign up
              </Button>
            </Link>
          </SignedOut>
          <div className="flex justify-center items-center">
            <SignedIn>
              <SignOutButton>
                <Button
                  className="rounded-full bg-red-1 text-base hover:bg-red-2"
                  onClick={handleSignout}
                >
                  Sign out
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}

const MenuIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
};

const MountainIcon: FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <div className="flex items-center">
      <Image src={logo} alt="company logo" width={30} height={30} />
    </div>
  );
};
