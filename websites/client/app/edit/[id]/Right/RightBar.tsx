import Link from "next/link";
import { IoIosHelp } from "react-icons/io";
import { useComponent } from "../../../../hooks/useComponent";
import { useProject } from "../../../../hooks/useProject";
import { RightTabs } from "./Tabs";

export const RightBar = () => {
  const comp = useComponent();

  return (
    <div className="h-full shrink-0 flex flex-col justify-between items-center bg-base-100 border-r border-base-300">
      <div className="flex flex-col w-full space-y-4">
        {comp && (
          <>
            <Item id={"general"} />
            <Item id={"transform"} />
            <Item id={"animations"} />
            <Item id={comp?.comp} />
          </>
        )}
        {!comp && <Item id={"general"} />}
      </div>
      <Link href="/" className="pb-4 text-2xl">
        <IoIosHelp />
      </Link>
    </div>
  );
};

const Item = ({ id }: { id: RightTabs }) => {
  const setTab = useProject((s) => s.rightSetTab);
  const tab = useProject((s) => s.rightTab);
  const value = RightTabs[id];
  if (!value) return null;
  const Icon = value.Icon;
  return (
    <div
      onClick={() => setTab(id)}
      className={`flex flex-col items-center cursor-pointer text-base-content-2 duration-150 space-y-1 py-1 hover:opacity-100 ${
        tab === id ? "bg-base-300 " : "opacity-60"
      }`}
    >
      <Icon className="h-6 w-6 " />
      <p className="text-[11px] text-center ">{value.name}</p>
    </div>
  );
};
