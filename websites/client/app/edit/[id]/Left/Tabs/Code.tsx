import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useStore } from "../../../../../hooks/useStore";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Code() {
  const template = useStore((t) => t.project.template);
  const set = useStore((t) => t.set);
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
      <CodeEditor
        language="json"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="h-full !bg-base-200 rounded-lg "
        style={{
          fontSize: 14,
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
}
