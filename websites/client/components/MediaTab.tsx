import { useFiles } from "../hooks/useFiles";
import { MediaTabs } from "../types";

export default function Media() {
  const mediaType = useFiles((t) => t.mediaType);
  const setMediaType = useFiles((t) => t.setMediaType);
  return (
    <div className="tabs w-full flex-nowrap">
      {Object.entries(MediaTabs).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setMediaType(key as MediaTabs)}
          className={`tab tab-bordered w-full px-2 ${
            mediaType === key ? "tab-active" : ""
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
