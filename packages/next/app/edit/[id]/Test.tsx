"use client";

import { useState } from "react";

export default function Test({ id, elements }: { id: string; elements: string }) {
  const [modifiedElements, setModifiedElements] = useState(
    JSON.stringify(JSON.parse(elements), null, 2)
  );
  return (
    <div className="flex flex-col items-center space-y-4 h-96 my-10 ">
      <textarea
        value={modifiedElements}
        onChange={(e) => setModifiedElements(e.currentTarget.value)}
        className="w-full h-full max-w-screen-sm bg-base-300 m-auto p-2 rounded-lg"
      />
      <a
        className="bg-primary text-primary-content rounded-lg p-2 "
        href={`/api/images/${id}?elements=${encodeURIComponent(modifiedElements)}`}
        target="_blank"
        rel="noreferrer"
      >
        SHOW
      </a>
    </div>
  );
}
