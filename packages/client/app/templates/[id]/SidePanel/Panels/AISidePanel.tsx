import { FormEvent, useState } from "react";
import axios from "axios";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { useTemplate } from "../../../../../hooks/useTemplate";

export const AISidePanel = () => {
  const { template, setTemplate } = useTemplate();
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"loading" | "done" | "error">();

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (status === "loading")
      return alert("Please wait for the previous request to finish");
    setStatus("loading");
    try {
      const result = await axios.post("/api/ai", {
        comps: template.comps,
        prompt,
      });
      console.log(result.data);
      setTemplate({ ...template, comps: result.data });
      setStatus("done");
    } catch (e) {
      console.log(e);
      setStatus("error");
    }
  };
  const commentEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10 w-full">
      <PanelTitle title="Edit video using AI" />
      <form action="none" className="flex flex-col w-full" onSubmit={submit}>
        <textarea
          className="bg-base-200 rounded-t-lg min-h-[100px] p-2"
          value={prompt}
          onKeyDown={commentEnterSubmit}
          placeholder="Enter your prompt here"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-primary-content p-2 rounded-b-lg gradient font-semibold text-lg"
        >
          Submit
        </button>
      </form>
      {status === "loading" && <p>Loading...</p>}
      {status === "done" && <p>Successfully updated</p>}
      {status === "error" && <p className="text-error">Error</p>}
    </div>
  );
};
