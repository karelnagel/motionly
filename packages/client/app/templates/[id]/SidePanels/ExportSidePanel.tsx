import { useRender } from "@asius/sdk";
import { TemplateType } from "@asius/components";
import { useState } from "react";
import { NumberInput } from "../../../../components/inputs";

export const ExportSidePanel = ({ template }: { template: TemplateType }) => {
  const [frame, setFrame] = useState(0);
  const { media, still, cost, progress, fileUrl, status } = useRender({
    ...template,
    frame: 0,
  });
  const className =
    "bg-primary rounded-lg p-2 text-primary-content whitespace-nowrap";
  return (
    <div className=" flex flex-col items-center space-y-3">
      <h1 className="text-xl font-bold uppercase">Export</h1>
      <div className="space-y-2 flex flex-col items-center">
        <button onClick={media} className={className}>
          Render video
        </button>
        <div className="flex space-x-2">
          <NumberInput label="Frame" onChange={setFrame} value={frame} />
          <button onClick={still} className={className}>
            Render frame
          </button>
        </div>
        {!!progress && (
          <div className="w-full h-4 bg-base-200 rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
        {!!cost && <p>{cost}</p>}
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
        <p>{status}</p>
      </div>

      <p>
        ID: <span className="text-lg font-bold">{template.id}</span>
      </p>
      <textarea
        readOnly
        value={JSON.stringify(template.comps, null, 2)}
        className="w-full min-h-[600px] bg-base-200 rounded-lg p-2"
      />
    </div>
  );
};
