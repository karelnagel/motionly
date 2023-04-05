"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { github } from "~/config";
import { Download } from "./Download";
import { Logo } from "./Logo";

const items: { name: string; route: string }[] = [
  { name: "docs", route: "/docs" },
  { name: "github", route: github },
];

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className="z-20 w-full h-[60px] bg-base-100 bg-opacity-80 shadow-md fixed top-0">
      <div className=" max-w-screen-xl h-full mx-auto px-2 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4 w-full justify-end">
          <div className="space-x-5 hidden md:flex ">
            {items.map((item) => (
              <Link
                href={item.route}
                key={item.route}
                className={`font-medium text-[20px] duration-200 ${pathname?.includes(item.route) ? "text-primary" : "hover:text-primary"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Download />
        </div>
      </div>
    </div>
  );
};
