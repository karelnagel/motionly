import { Left } from ".";
import { IoIosCode } from "react-icons/io";
import { useTest } from "../../../store";
import { toast } from "sonner";

export const code: Left = {
  icon: () => <IoIosCode />,
  title: "Code",
  component: () => {
    const test = useTest((s) => s.test);
    const editTest = useTest((s) => s.setTest);
    return (
      <div>
        <p>{test}</p>
        <input type="text" value={test} onChange={(e) => editTest(Number(e.target.value))} />
        <input type="text" value={test} onChange={(e) => editTest(e.target.value as any)} />
        <button onClick={() => toast.error("sadf")}>dsf</button>
      </div>
    );
  },
};
