import { useLeft } from "../hooks/useLeft";
import { MediaTabs } from "../types";
export default function Media() {
  const mediaTab = useLeft((t) => t.mediaTab);
  const setMediaTab = useLeft((t) => t.setMediaTab);
  return (
    <div className="tabs w-full flex-nowrap">
      {Object.entries(MediaTabs).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setMediaTab(key as MediaTabs)}
          className={`tab tab-bordered w-full px-2 ${
            mediaTab === key ? "tab-active" : ""
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
