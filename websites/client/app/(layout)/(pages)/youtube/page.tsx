"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../../../ClientProvider";

export default function Youtube({
  searchParams: { url },
}: {
  searchParams: { url?: string };
}) {
  const [newUrl, setNewUrl] = useState(url || "");
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full pt-32">
      <div className="max-w-screen-sm w-full space-y-14">
        <form
          action="submit"
          className="flex flex-col items-center space-y-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/youtube?url=${encodeURIComponent(newUrl)}`);
          }}
        >
          <h1 className="title text-5xl font-bold">Download Youtube video</h1>
          <input
            type="text"
            className="input input-primary w-full"
            value={newUrl}
            onChange={(e) => setNewUrl(e.currentTarget.value)}
          />
          <button type="submit" className="btn btn-primary">
            Convert
          </button>
        </form>
        {url && <Video url={url} />}
      </div>
    </div>
  );
}

const Video = ({ url }: { url: string }) => {
  const { data, isLoading, isError } = trpc.youtube.get.useQuery({ url });
  return (
    <div className="space-y-5 w-full">
      <p className="text-3xl">Converted Video</p>
      {isLoading && (
        <progress className="progress w-full h-2 progress-primary" />
      )}
      {isError && <p>Error</p>}
      {data && (
        <>
          <Link
            href={url}
            target="_blank"
            className="flex bg-base-300 rounded-lg space-x-3 items-center p-2"
          >
            <img src={data.thumbnail} className="w-32 object-contain" />
            <div>
              <p>{data.name}</p>
              <p className="opacity-80 text-sm">Duration: {data.duration}s</p>
            </div>
          </Link>
          <table className="table text-center table-zebra w-full">
            <thead>
              <tr>
                <th>Format</th>
                <th>Quality</th>
                <th>Size</th>
                <th>Has Video</th>
                <th>Has Audio</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {data.formats.map((format, i) => (
                <tr key={i}>
                  <td>
                    <Link target="_blank" href={format.url}>
                      {format.container}
                    </Link>
                  </td>
                  <td>{format.qualityLabel}</td>
                  <td>{contentLengthToSize(format.contentLength)}</td>
                  <td>{format.hasVideo ? "X" : ""}</td>
                  <td>{format.hasAudio ? "X" : ""}</td>
                  <td>
                    <Download
                      url={format.url}
                      fileName={`${data.name}.${format.container}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const Download = ({ url, fileName }: { url: string; fileName: string }) => {
  return (
    <a
      download={fileName}
      target={"_blank"}
        href={`/api/proxy?url=${encodeURIComponent(url)}`}
      className="btn btn-outline"
    >
      Download
    </a>
  );
};

const contentLengthToSize = (contentLength?: string) => {
  if (!contentLength) return "";
  const length = parseInt(contentLength);
  if (length < 1000) {
    return `${length}B`;
  }
  if (length < 1000000) {
    return `${(length / 1000).toFixed(2)}KB`;
  }
  if (length < 1000000000) {
    return `${(length / 1000000).toFixed(2)}MB`;
  }
  return `${(length / 1000000000).toFixed(2)}GB`;
};
