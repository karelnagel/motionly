import { TemplateType } from "@asius/components";

export const AISidePanel = ({
  template,
  setTemplate,
}: {
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
}) => {
  return (
    <div>
      <p>Create your video using ai</p>
      <input type="text" />
    </div>
  );
};
