import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../public/motionly.png";
import logoGif from "../public/motionly.gif";

const items = [
  { name: "Docs", route: "/docs" },
  { name: "Blog", route: "/blog" },
  { name: "About", route: "/about" },
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <div
      className={`${
        router.pathname === "/" ? "absolute top-0" : "relative"
      } z-20 w-full`}
    >
      <div className="max-w-screen-xl mx-auto px-2 grid grid-cols-5 items-center">
        <Image src={logo} alt="logo" className=" w-60 col-span-2" />
        <div className="relative">
          <Image src={logoGif} alt="logo" className=" h-20 object-contain" />
        </div>
        <div className="flex items-center space-x-6 col-span-2 w-full justify-end">
          <div className="flex space-x-5">
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
            <button className="btn btn-gradient text-[17px] font-semibold flex !w-auto !uppercase items-center space-x-2">
              Contact us <IoIosArrowForward className="text-2xl" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
