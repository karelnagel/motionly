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
    comps: [
      {
        comp: "text",
        text: name,
        id: "name",
        x: 100,
        textStyle: {
          fontSize: 75,
          lineHeight: 1,
          color: {
            type: "basic",
            color,
          },
        },
      },
      {
        comp: "text",
        text: birthday,
        x: 100,
        y: 100,
        id: "date",
        textStyle: {
          fontSize: 75,
          lineHeight: 1,
          color: {
            type: "basic",
            color,
          },
        },
      },
    ],
  };
};
