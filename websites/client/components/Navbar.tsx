"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/motionly.png";
import { Login } from "./Login";

const items: { name: string; route: string }[] = [
  { name: "Docs", route: "/docs" },
  { name: "Blog", route: "/blog" },
  { name: "About", route: "/about" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="relative z-20 w-full mt-3">
      <div className="max-w-screen-xl mx-auto px-2 grid grid-cols-3 md:grid-cols-5 items-center">
        <Link href="/" className=" w-60 col-span-2 block">
          <Image src={logo} priority alt="logo" className="w-60" />
        </Link>
        <div className="flex items-center space-x-8 w-full col-span-1 md:col-span-3 justify-end">
          <div className=" space-x-5 hidden md:flex col-span-2">
            {items.map((item) => (
              <Link
                href={item.route}
                key={item.route}
                className={` font-light text-[20px] md:text-xl hover:scale-105 duration-200 ${
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
