import { FormEvent, useState } from "react";
import { useAlerts } from "../../../../../../components/Alert";
import { useProject } from "../../../../../../hooks/useProject";
import { trpc } from "../../../../../ClientProvider";

export default function Ai() {
  const template = useProject((t) => t.project.template);
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"loading" | "done" | "error">();
  const alert = useAlerts((s) => s.addAlert);
  const { mutateAsync: postAI } = trpc.ai.message.useMutation();
  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (status === "loading")
      return alert("Please wait for the previous request to finish", "warning");
    setStatus("loading");

    const result = await postAI({ template: template, prompt });
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
    <div className="flex flex-col items-center space-y-4 w-full py-4">
      <p>
        Still in development, but ideally should generate/change video based on
        input prompt
      </p>
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
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      {status === "loading" && <p>Loading...</p>}
      {status === "done" && <p>Successfully updated</p>}
      {status === "error" && <p className="text-error">Error</p>}
    </div>
  );
}
