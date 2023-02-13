import { useFiles } from "../hooks/useFiles";
import { MediaType, MediaTypeLabels } from "../types";

export  function MediaTab() {
  const mediaType = useFiles((t) => t.mediaType);
  const setMediaType = useFiles((t) => t.setMediaType);
  return (
    <div className="tabs w-full flex-nowrap">
      {Object.entries(MediaTypeLabels).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setMediaType(key as MediaType)}
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
