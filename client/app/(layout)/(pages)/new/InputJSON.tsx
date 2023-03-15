import { useEffect, useState } from "react";
import { useSchema } from "./useSchema";

export const InputJSON = () => {
  const setInput = useSchema((s) => s.setInput);
  const inputToSchema = useSchema((s) => s.inputToSchema);
  const input = useSchema((s) => s.input);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => setText(JSON.stringify(input, null, 2)), [input]);
  useEffect(() => {
    try {
      const json = JSON.parse(text);
      setInput(json);
      setError(false);
    } catch (e) {
      setError(true);
    }
  }, [text]);

  return (
    <div className="flex flex-col">
      {error && <div className="text-red-500">Invalid JSON</div>}
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-40" />
      <button className="btn btn-primary" onClick={inputToSchema}>
        Submit
      </button>
      <button
        className="btn btn-outline"
        onClick={() => {
          setInput({});
          inputToSchema();
        }}
      >
        Put in manually
      </button>
    </div>
  );
};
