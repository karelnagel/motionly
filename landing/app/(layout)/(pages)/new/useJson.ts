import { useState } from "react";

export const useJson = () => {
  const [text, setText] = useState("");
  const [json, setJson] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState(false);
  const onChange = (e: { target: { value: string } }) => {
    setText(e.target.value);
    try {
      setJson(JSON.parse(e.target.value));
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  return { text, json, onChange, error };
};
