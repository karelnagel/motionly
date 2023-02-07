import Link from "next/link";
import { IoIosHelp } from "react-icons/io";
import { useProject } from "../../../../hooks/useProject";
import { RightTabs } from "../../../../hooks/useProject/rightSlice";

export const RightBar = () => {
  const setTab = useProject((s) => s.right.setTab);
  const tab = useProject((s) => s.right.tab);

  return (
    <div className="h-full shrink-0 flex flex-col justify-between items-center bg-base-100 border-r border-base-300">
      <div className="flex flex-col w-full space-y-4">
        {Object.entries(RightTabs).map(([key, value], i) => {
          const Icon = value.Icon;
          return (
            <div
              key={i}
              onClick={() => setTab(key as RightTabs)}
              className={`flex flex-col items-center cursor-pointer text-base-content-2 duration-150 space-y-1 py-1 hover:opacity-100 ${
                tab === key ? "bg-base-300 " : "opacity-60"
              }`}
            >
              <Icon className="h-6 w-6 " />
              <p className="text-[11px] text-center ">{value.name}</p>
            </div>
          );
        })}
      </div>
      <Link href="/" className="pb-4 text-2xl">
        <IoIosHelp />
      </Link>
    </div>
  );
};
