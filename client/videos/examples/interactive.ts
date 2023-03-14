import { TemplateType } from "@motionly/base";

export const interactive = ({
  name,
  color,
  birthday,
}: {
  name: string;
  color: string;
  birthday: string;
}): TemplateType => {
  return {
    duration: 10,
    fps: 30,
    width: 1920,
    height: 1080,
    components: {},
    childIds: [],
  };
};
