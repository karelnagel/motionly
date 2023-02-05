import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useLeft } from "../../../../hooks/useLeft";
import { LeftTabs } from "./Tabs";

export const LeftBar = () => {
  const setTab = useLeft((s) => s.setTab);
  const tab = useLeft((s) => s.tab);

  return (
    <div className="h-full shrink-0 flex flex-col justify-between items-center bg-base-100 border-r border-base-300">
      <div className="flex flex-col">
        <Link href="/" className="p-2">
          <Image
            src="/logo.png"
            alt="logo"
            className=""
            width={50}
            height={50}
          />
        </Link>
        <div className="flex flex-col w-full space-y-4">
          {Object.entries(LeftTabs).map(([key, value], i) => {
            const Icon = value.Icon;
            return (
              <div
                key={i}
                onClick={() => setTab(key as LeftTabs)}
                className={`flex flex-col items-center cursor-pointer text-base-content-2 duration-150 space-y-1 py-1 hover:opacity-100 ${
                  tab === key ? "bg-base-300 " : "opacity-60"
                }`}
              >
                <Icon className="h-6 w-6 " />
                <p className="text-[11px] text-center ">
                  {value.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Link href="/" className="pb-4 text-2xl">
        <IoIosArrowBack />
      </Link>
    </div>
  );
};
