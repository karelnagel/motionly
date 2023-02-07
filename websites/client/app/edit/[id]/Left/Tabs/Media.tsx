import MediaTab from "../../../../../components/MediaTab";
import { useLeft } from "../../../../../hooks/useProject/leftSlice";

export default function Media() {
  const mediaTab = useLeft((t) => t.mediaTab);
  const setTab = useLeft((t) => t.setTab);
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
