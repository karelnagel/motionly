import { TranscriptionProps } from "@motionly/base";
import { Component } from ".";
import { MdSubtitles } from "react-icons/md";

export const transcription: Component<TranscriptionProps> = {
  name: "Transcription",
  Icon: MdSubtitles,
  hue: 99,
  inputs: [
    {
      prop: "startFrom",
      type: "number",
    },
    {
      prop: "scrollByPage",
      type: "checkbox",
    },
    {
      prop: "animationType",
      type: "transcription-types",
    },
    {
      prop: "textStyle",
      type: "style",
    },
    {
      prop: "animationStyle",
      type: "style",
    },
  ],
};
