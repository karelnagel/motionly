"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/motionly.png";
import { Login } from "./Login";

const items: { name: string; route: string }[] = [
  { name: "Templates", route: "/templates" },
  { name: "Docs", route: "/docs" },
  { name: "Blog", route: "/blog" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="relative z-20 w-full mt-3">
      <div className="max-w-screen-xl mx-auto px-2 flex justify-between items-center">
        <Link href="/" >
          <Image src={logo} priority alt="Motionly logo" className="w-60" />
        </Link>
        <div className="flex items-center space-x-4 w-full justify-end">
          <div className="space-x-3 hidden md:flex ">
            {items.map((item) => (
              <Link
                href={item.route}
                key={item.route}
                className={`font-medium text-[20px] duration-200 ${
                  pathname?.includes(item.route)
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};
