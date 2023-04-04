import { useTemplate, useTemplateStore } from "../store";

export const home = () => {
  const newTemplate = useTemplateStore((s) => s.newTemplate);
  const allTemplates = useTemplateStore((s) => s.allTemplates);
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">What are you up to today?</p>
        <button onClick={newTemplate} className="btn-primary">
          Start New
        </button>
      </div>
      <div className="divider">Your Projects</div>
      <div className="grid grid-cols-4 gap-3">
        {allTemplates.map((id) => (
          <Template id={id} key={id} />
        ))}
      </div>
    </div>
  );
};

const Template = ({ id }: { id: string }) => {
  const template = useTemplate(undefined, id);
  const setTemplate = useTemplateStore((s) => s.setTemplate);
  return (
    <div onClick={() => setTemplate(id)} className="bg-primary rounded-lg p-2 cursor-pointer flex flex-col items-center shadow-lg">
      <p>{template.name}</p>
      <p className="text-sm">
        {template.width} x {template.height}
      </p>
      <p className="text-sm">{template.duration} s</p>
    </div>
  );
};
