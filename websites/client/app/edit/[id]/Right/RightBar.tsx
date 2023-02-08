import Link from "next/link";
import { IoIosHelp } from "react-icons/io";
import { useComponent } from "../../../../hooks/useComponent";
import { useProject } from "../../../../hooks/useProject";
import { RightTabs } from "./Tabs";
import { components } from "./Tabs/components";

export const RightBar = () => {
  const comp = useComponent();
  const hue = comp ? components[comp?.comp].hue : 0;
  return (
    <div className="h-full shrink-0 flex flex-col justify-between items-center bg-base-100 border-r border-base-300">
      <div className="flex flex-col w-full space-y-4">
        {comp && (
          <>
            <Item id={"general"} hue={hue} />
            <Item id={"transform"} hue={hue} />
            <Item id={"animations"} hue={hue} />
            <Item id={comp?.comp} hue={hue} />
          </>
        )}
        {!comp && <Item id={"general"} hue={hue} />}
      </div>
      <Link href="/" className="pb-4 text-2xl">
        <IoIosHelp />
      </Link>
    </div>
  );
};

const Item = ({ hue, id }: { id: RightTabs; hue: number }) => {
  const setTab = useProject((s) => s.rightSetTab);
  const tab = useProject((s) => s.rightTab);
  const value = RightTabs[id];
  if (!value) return null;
  const Icon = value.Icon;
  return (
    <div
      onClick={() => setTab(id)}
      style={{
        background: tab === id ? `hsl(${hue}, 36%, 40%)` : "none",
        color: "#FFF",
      }}
      className={`flex flex-col items-center cursor-pointer text-base-content-2 duration-150 space-y-1 py-1 hover:opacity-100 ${
        tab === id ? "" : "opacity-60"
      }`}
    >
      <Icon className="h-6 w-6 " />
      <p className="text-[11px] text-center ">{value.name}</p>
    </div>
  );
};
