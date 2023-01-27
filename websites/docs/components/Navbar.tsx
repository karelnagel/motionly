import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Navbar = () => {
  const router = useRouter();
  const items = [
    { name: "Docs", route: "/docs" },
    { name: "Blog", route: "/blog" },
    { name: "About", route: "/about" },
  ];
  return (
    <div 
    className={`${router.pathname==="/"?"absolute":"relative" } z-20 w-full`}>
      <div className="flex p-2 md:p-3 justify-between items-center font-sans max-w-screen-xl mx-auto">
        <Link href="/">
          <Image
            src="/motionly.png"
            width={350}
            height={30}
            alt="logo"
            className="hidden sm:block"
          />
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="sm:hidden"
          />
        </Link>
        <div className="relative">
          <Image
            src={"/transpMotionly.gif"}
            width={120}
            height={100}
            alt="logo"
            className="relative rounded-full hidden sm:block"
          />
        </div>
        <div className="flex items-center space-x-2 md:space-x-6">
          {items.map((item) => (
            <Link
              href={item.route}
              key={item.route}
              className={`capitalize font-medium text-lg md:text-xl block hover:scale-105 duration-200 ${router.pathname.includes(item.route)
                  ? "text-primary"
                  : "hover:text-primary "
                }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex mb-1 space-y-6 space-x-10 md:space-x-10 text-md md:text-md font-normal  ">
            <Link href="mailto:info@motionly.video">
              <button className=" rounded-3xl p-2 px-4 pr-2 text-gray-200 bg-gradient-to-l to-primary from-red-500 transform hover:scale-110 duration-500">
                CONTACT US <IoIosArrowForward className="inline text-2xl pb-0" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
