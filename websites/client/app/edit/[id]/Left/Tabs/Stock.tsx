import MediaTab from "../../../../../components/MediaTab";
import { useLeft } from "../../../../../hooks/useLeft";
import { useEffect } from "react";
import { getStock } from "../../../../../sdk/stock";
import { useStore } from "../../../../../hooks/useStore";
import { getRandomId } from "../../../../../helpers";
import Link from "next/link";

export default function Stock() {
  const mediaTab = useLeft((t) => t.mediaTab);
  const setTab = useLeft((t) => t.setTab);
  const addComp = useStore((s) => s.addComp);
  const media = useLeft((s) => s.media);
  const setMedia = useLeft((s) => s.setMedia);
  const query = useLeft((s) => s.query);
  const setQuery = useLeft((s) => s.setQuery);

  useEffect(() => {
    getStock(mediaTab, query || undefined).then((res) =>
      setMedia(res || undefined)
    );
  }, [mediaTab]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    getStock(mediaTab, query).then((res) => setMedia(res || undefined));
  };
  const add = (src: string) => {
    addComp({
      id: getRandomId(),
      comp: mediaTab,
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
                    {mediaTab !== "audio" && (
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
