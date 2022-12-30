import { TemplateType } from "@asius/types";

export const ExportSidePanel = ({ template }: { template: TemplateType }) => {
  return (
    <div className=" flex flex-col items-center space-y-3">
      <h1 className="text-xl font-bold uppercase">Export</h1>
      <button
        onClick={() => alert("Coming soon!!!")}
        className="bg-primary rounded-lg p-2 text-primary-content"
      >
        Render
      </button>
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
