import MediaTab from "../../../../../components/MediaTab";
import { useLeft } from "../../../../../hooks/useLeft";

export default function Stock() {
  const mediaTab = useLeft((t) => t.mediaTab);
  return (
    <div className="flex flex-col w-full">
      <MediaTab />
    </div>
  );
}
