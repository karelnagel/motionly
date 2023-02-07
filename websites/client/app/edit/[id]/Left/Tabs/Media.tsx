import MediaTab from "../../../../../components/MediaTab";
import { useProject } from "../../../../../hooks/useProject";

export default function Media() {
  const setTab = useProject((t) => t.left.setTab);
  return (
    <div className="flex flex-col w-full justify-between h-full">
      <div>
        <MediaTab />
      </div>
      <button onClick={() => setTab("stock")} className="btn btn-sm">
        Use stock media
      </button>
    </div>
  );
}
