import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useProject } from "../../../../../hooks/useProject";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Code() {
  const template = useProject((t) => t.project.template);
  const set = useProject((t) => t.set);
  const [json, setJson] = useState(JSON.stringify(template, null, 2));
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      set((s) => {
        s.project.template = JSON.parse(json);
      });
      setError(false);
    } catch (e) {
      setError(true);
    }
  }, [json]);
  return (
    <div className="h-full">
      {error && <p className="text-error">Not a valid JSON!</p>}
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="h-full !bg-base-200 rounded-lg w-full"
        style={{
          fontSize: 14,
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
}
