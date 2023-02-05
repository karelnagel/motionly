import { useEffect, useState } from "react";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { Input } from "../../../../../components/inputs";
import { useRender } from "@motionly/renderer/dist/sdk";
import { useStore } from "../../../../../hooks/useStore";

export const ExportSidePanel = () => {
  // const setTemplate = useTemplate((t) => t.setTemplate);
  const template = useStore((t) => t.project.template);
  const [frame, setFrame] = useState(0);
  const [renderStill, setRenderStill] = useState(false);
  const { media, still, cost, progress, fileUrl, status } = useRender(
    template,
    frame
  );
  const [json, setJson] = useState(JSON.stringify(template, null, 2));
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      // setTemplate(JSON.parse(json));
      setError(false);
    } catch (e) {
      setError(true);
    }
  }, [json]);
  return (
    <div className="flex flex-col items-center space-y-3 w-full overflow-y-auto overflow-x-clip">
      <PanelTitle title="Export your video" />
      <div className="space-y-2 w-full">
        <div className="flex space-x-2 justify-between">
          {!!cost && <p>${cost}</p>}
          {fileUrl && (
            <a
              href={fileUrl}
              download
              target="_blank"
              className="text-primary font-semibold hover:scale-110 duration-200"
              rel="noreferrer"
            >
              LINK
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 w-full">
          <Input
            type="checkbox"
            label="Image"
            value={renderStill}
            onChange={() => setRenderStill((r) => !r)}
          />
          {renderStill && (
            <Input
              type="number"
              label="Frame"
              onChange={(e) => setFrame(e || 0)}
              value={frame}
            />
          )}
        </div>
        <div
          onClick={renderStill ? still : media}
          className="w-full p-2 cursor-pointer text-center relative bg-base-200 rounded-lg shadow-lg overflow-hidden text-primary-content whitespace-nowrap"
        >
          <div
            className={`h-full ${
              status === "error" ? "bg-error" : "gradient"
            } top-0 left-0 absolute`}
            style={{ width: `${(progress ?? 1) * 100}%` }}
          />
          <p className="relative">Render {renderStill ? "image" : "video"}</p>
        </div>
      </div>
      <p className="text-xl font-semibold pt-6">Export</p>
      <p>
        Use this json in{" "}
        <a
          href="https://motionly.video/docs/sdk"
          className="text-primary"
          target="_blank"
          rel="noreferrer"
        >
          @motionly/sdk
        </a>{" "}
        or
        <a
          href="https://motionly.video/docs/player"
          className="text-primary"
          target="_blank"
          rel="noreferrer"
        >
          @motionly/player
        </a>
      </p>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className={`w-full min-h-[600px] ${
          error ? "bg-error text-error-content" : "bg-base-200"
        } rounded-lg p-2`}
      />
    </div>
  );
};