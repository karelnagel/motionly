import Image from "next/image";
import Link from "next/link";
import { useTheme } from "nextra-theme-docs";
import { appUrl } from "../../env";

export const Hero = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col items-center w-full py-40 space-y-14">
        <div className="relative">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute h-full w-full scale-[2.2]"
          >
            <circle
              cx="100"
              cy="100"
              r="50"
              className="blur-[12px] fill-blue-600 "
            />
          </svg>
          <Image
            src={isLight ? "/favicon.png" : "/favicondark.png"}
            width={180}
            height={120}
            alt="logo"
            className="relative"
          />
        </div>

        <div className="relative text-center max-w-[800px] space-y-6 flex flex-col items-center">
          <h1 className="title text-[70px] font-extrabold leading-[1]">
            Automate your videos
          </h1>
          <p className="text-[24px] leading-[1.6] font-medium text-center max-w-[550px] opacity-90">
            With Asius you can automate your video editing and integrate videos
            with dynamic data on your site.
          </p>
        </div>

        <div className="flex space-x-10 text-2xl font-bold">
          <Link href={appUrl}>
            <button className=" rounded-lg p-3 bg-gradient-to-r from-pink-500 to-blue-600  w-44 text-white">
              Get Started
            </button>
          </Link>
          <Link href="/docs">
            <button className="border-4 rounded-lg p-2 w-44">Docs</button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 h-1 w-full bg-gradient-to-l from-pink-500 to-blue-600 rounded-lg" />
    </div>
  );
};
