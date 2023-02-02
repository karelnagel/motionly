import { TemplateType } from "@motionly/base";
import { Input } from ".";

const inputs = {
  image: {
    type: "text",
    label: "Image",
    value: "https://picsum.photos/seed/sadfdasasd/1920/1080",
  },
  name: {
    type: "text",
    label: "Name",
    value: "Gary Vaynerchuck",
  },
  handle: {
    type: "text",
    label: "Handle",
    value: "@garyvee",
  },
  text: {
    type: "text",
    label: "Text",
    value: "Hey, I'm Gary Vaynerchuck and I'm a huge fan of Motionly.",
  },
};

const template = ({
  image,
  name,
  handle,
  text,
}: {
  image?: Input;
  name?: Input;
  handle?: Input;
  text?: Input;
}): TemplateType => ({
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  components: {},
  childIds: [],
});

export const tweet = {
  inputs,
  template,
};
