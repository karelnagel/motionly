import Link from "next/link";
import { IoIosHelp } from "react-icons/io";
import { Bar, BarItem } from "../../../../components/Bar";
import { useComponent } from "../../../../hooks/useComponent";
import { useProject } from "../../../../hooks/useProject";
import { RightTabs } from "./Tabs";
import { components } from "./Tabs/components";

export const RightBar = () => {
  const comp = useComponent();
  const hue = comp ? components[comp?.comp].hue : 0;
  return (
    <Bar
      bottom={
        <Link href="/" className="text-2xl">
          <IoIosHelp />
        </Link>
      }
    >
      <div className="flex flex-col w-full space-y-4">
        {comp && (
          <>
            <Item id={"general"} hue={hue} />
            <Item id={"transform"} hue={hue} />
            <Item id={"animations"} hue={hue} />
            <Item id={"component"} hue={hue} />
          </>
        )}
      </div>
    </Bar>
  );
};

const Item = ({ hue, id }: { id: RightTabs; hue: number }) => {
  const setTab = useProject((s) => s.rightSetTab);
  const tab = useProject((s) => s.rightTab);
  const comp = useComponent();
  const tabId = id !== "component" ? id : comp!.comp;
  const value = tabId ? RightTabs[tabId] : undefined;
  if (!value) return null;
  return (
    <BarItem
      onClick={() => setTab(id)}
      style={{
        background: tab === id ? `hsl(${hue}, 36%, 40%)` : "none",
        color: "#FFF",
      }}
      className={tab === id ? "" : "opacity-60"}
      text={value.name}
      Icon={value.Icon}
    />
  );
};
