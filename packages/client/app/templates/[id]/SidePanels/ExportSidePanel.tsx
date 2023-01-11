import { useRender } from "@asius/sdk";
import { TemplateType } from "@asius/components";
import { useState } from "react";
import { PanelTitle } from "../../../../components/PanelTitle";
import { BooleanInput, NumberInput } from "../../../../components/inputs";

export const ExportSidePanel = ({ template }: { template: TemplateType }) => {
  const [frame, setFrame] = useState(0);
  const [renderStill, setRenderStill] = useState(false);
  const { media, still, cost, progress, fileUrl, status } = useRender({
    ...template,
    frame,
  });
  return (
    <div className=" flex flex-col items-center space-y-3 w-full">
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
          <BooleanInput
            label="Image"
            value={renderStill}
            onChange={setRenderStill}
          />
          {renderStill && (
            <NumberInput
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
          href="https://asius.dev/docs/sdk"
          className="text-primary"
          target="_blank"
          rel="noreferrer"
        >
          @asius/sdk
        </a>{" "}
        or
        <a
          href="https://asius.dev/docs/player"
          className="text-primary"
          target="_blank"
          rel="noreferrer"
        >
          @asius/player
        </a>
      </p>
      <textarea
        readOnly
        value={JSON.stringify(template.comps, null, 2)}
        className="w-full min-h-[600px] bg-base-200 rounded-lg p-2"
      />
    </div>
  );
};
