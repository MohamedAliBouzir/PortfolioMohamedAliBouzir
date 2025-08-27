"use client";

import { CiMenuFries } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { navigationMenu } from "@/Content/navigation-menu";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-2xl text-accent" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="mt-4 w-full flex justify-center items-center">
          <h1 className="font-bold text-3xl">
            Lı<span className="text-4xl font-bold text-accent">.</span>
          </h1>
        </SheetTitle>
        <SheetDescription className="w-full h-full align-middle flex flex-col items-center gap-4">
          {navigationMenu.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`relative px-1 transition-colors duration-300
                        ${
                          link.path === pathname
                            ? "text-accent"
                            : "hover:text-accent"
                        }
                        group
                      `}
              >
                <span className="text-2xl mb-1 inline-block">{link.name}</span>
                <span
                  className={`
                          pointer-events-none absolute left-1/2 bottom-0 h-[2px] w-0 bg-accent
                          transition-all duration-300 ease-in-out
                          ${
                            link.path === pathname
                              ? "w-full"
                              : "group-hover: group-hover:w-full"
                          }
                          transform -translate-x-1/2
                        `}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
