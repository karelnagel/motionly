"use client";

import { useState } from "react";

export default function Test({ id, elements }: { id: string; elements: string }) {
  const [modifiedElements, setModifiedElements] = useState(
    JSON.stringify(JSON.parse(elements), null, 2)
  );
  return (
    <div className="flex flex-col items-center space-y-4">
      <textarea
        value={modifiedElements}
        onChange={(e) => setModifiedElements(e.currentTarget.value)}
        className="w-96 h-96"
      />
      <a
        className=""
        href={`/api/images/${id}?elements=${encodeURIComponent(modifiedElements)}`}
        target="_blank"
        rel="noreferrer"
      >
        SHOW
      </a>
    </div>
  );
}
