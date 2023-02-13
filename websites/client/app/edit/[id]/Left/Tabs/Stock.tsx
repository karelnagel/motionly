import { MediaTab } from "../../../../../components/MediaTab";
import { useEffect } from "react";
import { useProject } from "../../../../../hooks/useProject";
import { getRandomId } from "../../../../../helpers";
import Link from "next/link";
import { useFiles } from "../../../../../hooks/useFiles";

export default function Stock() {
  const setTab = useProject((t) => t.leftSetTab);
  const addComp = useProject((s) => s.addComp);
  const media = useFiles((s) => s.stockMedia);
  const query = useFiles((s) => s.stockQuery);
  const setQuery = useFiles((s) => s.setStockQuery);
  const fetchStock = useFiles((s) => s.fetchStock);
  const mediaType = useFiles((s) => s.mediaType);

  useEffect(() => {
    fetchStock();
  }, [mediaType]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    fetchStock();
  };
  const add = (src: string) => {
    addComp({
      id: getRandomId(),
      comp: mediaType.toLowerCase() as any,
      src,
      objectFit: "cover",
    });
  };
  return (
    <div className="flex flex-col w-full justify-between h-full space-y-4">
      <div className="space-y-4 flex flex-col overflow-y-auto overflow-x-hidden ">
        <MediaTab />
        <form action="none" onSubmit={onSubmit} className="flex ">
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-sm" type="submit">
            search
          </button>
        </form>

        <div className="flex flex-col space-y-4 h-full">
          {media?.map(({ logo, media, url }, i) => (
            <div key={i} className="space-y-2">
              <Link href={url} target="_blank">
                <img src={logo} className="h-8" />
              </Link>
              <div className="grid grid-cols-3 gap-2">
                {media.map(({ icon, src }) => (
                  <button
                    key={src}
                    onClick={() => add(src)}
                    className="w-full aspect-square bg-base-200  rounded-lg overflow-hidden"
                  >
                    {mediaType !== "AUDIO" && (
                      <img src={icon} className=" h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-sm" onClick={() => setTab("media")}>
        Upload your own
      </button>
    </div>
  );
}
