import { FormEvent, useState } from "react";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { useAlerts } from "../../../../../components/Alert";
import { postAI } from "../../../../../sdk/ai";
import { useTemplate } from "../../../../../hooks/useTemplate";

export const AISidePanel = () => {
  const template = useTemplate((t) => t.project.template);
  const setProject = useTemplate((t) => t.setProject);
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"loading" | "done" | "error">();
  const alert = useAlerts();

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (status === "loading")
      return alert("Please wait for the previous request to finish", "warning");
    setStatus("loading");

    const result = await postAI(template.components, prompt);
    if (!result) setStatus("error");
    else {
      // setProject({ ...template, : result });
      setStatus("done");
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
          className="bg-base-200 rounded-t-lg min-h-[100px] p-2 textarea"
          value={prompt}
          onKeyDown={commentEnterSubmit}
          placeholder="Enter your prompt here"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn gradient"
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
