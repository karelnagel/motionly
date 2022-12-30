"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const differentComps = {
  progressbar: "Progress Bar",
  audiogram: "Audiogram",
  transcription: "Transcription",
  map: "Map",
  mockup: "Mockup",
  graph: "Graph",
  qrcode: "QR Code",
  lottie: "Lottie",
  gif: "GIF",
  video: "Video",
};

export const SearchBar = ({ value, comp }: { value: string; comp: string }) => {
  const [search, setSearch] = useState(value);
  const [hasComp, setHasComp] = useState(comp);
  const pathName = usePathname();
  const router = useRouter();

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (hasComp) params.set("comp", hasComp);
    router.push(`${pathName}?${params}`);
  };
  useEffect(submit, [hasComp]);

  return (
    <form
      onSubmit={submit}
      className="my-3 flex space-x-3 items-center justify-between"
    >
      <input
        type="text"
        placeholder="Search"
        className="rounded-lg w-full px-4 py-3 bg-base-100 shadow-lg leading-none"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <select
        value={hasComp}
        onChange={(e) => setHasComp(e.target.value)}
        className="rounded-lg px-4 py-3 bg-base-100 shadow-lg leading-none"
      >
        <option value="">Has component</option>
        {Object.entries(differentComps).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <button
        onClick={() => submit()}
        className="text-primary-content rounded-lg px-4 py-4 leading-none bg-primary "
      >
        Search
      </button>
    </form>
  );
};
