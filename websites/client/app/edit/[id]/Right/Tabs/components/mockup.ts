import { MockupProps, MockupTypes } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const mockup: Tab<MockupProps> = {
  name: "Mockup",
  Icon: IoIosSettings,
  inputs: [
    {
      prop: "type",
      type: "select",
      options: Object.entries(MockupTypes).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "bg",
      type: "color",
    },
  ],
};
