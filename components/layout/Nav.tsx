"use client";

import Link from "next/link";
import { ModeToggle } from "../LightDarkButton";
import { usePathname } from "next/navigation";
import { navigationMenu } from "@/Content/navigation-menu";
import ClickMotion from "../motions/ClickMotion";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-8">
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
            <span className="mb-1 inline-block">{link.name}</span>
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
      <ClickMotion>
        <ModeToggle />
      </ClickMotion>
    </nav>
  );
};

export default Nav;
