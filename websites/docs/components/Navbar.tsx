import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../public/motionly.png";
import logoGif from "../public/motionly.gif";
import { Button } from "./Button";

const items = [
  { name: "Docs", route: "/docs" },
  { name: "Blog", route: "/blog" },
  { name: "About", route: "/about" },
];

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="relative z-20 w-full">
      <div className="max-w-screen-xl mx-auto px-2 grid grid-cols-3 md:grid-cols-5 items-center">
        <Link href="/" className=" w-60 col-span-2 hidden md:block">
          <Image
            src={logo}
            priority
            alt="logo"
            className="w-60"
          />
        </Link>
        <Link href="/" className="flex justify-start md:justify-center">
          <Image
            priority
            src={logoGif}
            alt="logo"
            className="w-16 md:w-20 object-contain "
          />
        </Link>
        <div className="flex items-center space-x-10 col-span-2 w-full justify-end">
          <div className=" space-x-5 hidden md:flex">
            {items.map((item) => (
              <Link
                href={item.route}
                key={item.route}
                className={` font-light text-[20px] md:text-xl hover:scale-105 duration-200 ${
                  router.pathname.includes(item.route)
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Link href="/#contact">
            <Button
              text="CONTACT US"
              className="text-[17px] font-normal p-1 pl-4 whitespace-nowrap bg-secondary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
