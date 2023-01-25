import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = ({
  items,
}: {
  items: { name: string; route: string }[];
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex p-2 md:p-3 justify-between items-center font-sans max-w-screen-xl mx-auto">
        <Link href="/">
          <Image
            src="/motionly.png"
            width={250}
            height={30}
            alt="logo"
            className="hidden md:block"
          />
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="md:hidden"
          />
        </Link>
        <div className="flex space-x-2 md:space-x-4">
          {items.map((item) => (
            <Link
              href={item.route}
              key={item.route}
              className={`capitalize font-medium text-lg md:text-xl block hover:scale-105 duration-200 ${
                router.pathname.includes(item.route)
                  ? "text-primary"
                  : "hover:text-primary "
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div
        className="bg-gradient-to-l from-secondary to-primary w-full"
        style={{ height: "2px" }}
      />
    </div>
  );
};
