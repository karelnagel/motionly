import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { Bar, BarItem } from "../../../../components/Bar";
import { useProject } from "../../../../hooks/useProject";
import { LeftTabs } from "./Tabs";

export const LeftBar = () => {
  const setTab = useProject((s) => s.leftSetTab);
  const tab = useProject((s) => s.leftTab);

  return (
    <Bar
      bottom={
        <Link href="/" className=" text-2xl ">
          <IoIosArrowBack />
        </Link>
      }
    >
      <div className="flex flex-col">
        <Link href="/" className="p-2">
          <Image
            src="/logo.png"
            alt="logo"
            className=""
            width={120}
            height={120}
            priority
          />
        </Link>
        <div className="flex flex-col w-full space-y-4">
          {Object.entries(LeftTabs).map(([key, value], i) => (
            <BarItem
              key={i}
              onClick={() => setTab(key as LeftTabs)}
              className={tab === key ? "" : "opacity-60"}
              text={value.name}
              Icon={value.Icon}
            />
          ))}
        </div>
      </div>
    </Bar>
  );
};
