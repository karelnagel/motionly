import { useProject } from "../hooks/useProject";
import { MediaTabs } from "../types";

export default function Media() {
  const mediaTab = useProject((t) => t.left.mediaTab);
  const setMediaTab = useProject((t) => t.left.setMediaTab);
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
