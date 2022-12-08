import Link from "next/link";
import { LoginButton } from "./LoginButton";

export const Header = () => {
  return (
    <header className=" bg-base-100 shadow-md">
      <div className="max-w-screen-lg m-auto items-center flex justify-between py-3 px-2">
        <Link className="text-3xl font-bold" href="/">
          Home
        </Link>
        <div className=" space-x-3 flex  items-center">
          <Link href="/templates">Templates</Link>
          <Link href="/about">About</Link>
          <LoginButton />
        </div>
      </div>
    </header>
  );
};
