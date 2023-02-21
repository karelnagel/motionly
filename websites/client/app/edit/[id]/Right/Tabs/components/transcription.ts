import { TranscriptionProps } from "@motionly/base";
import { Component } from ".";
import { MdSubtitles } from "react-icons/md";

export const transcription: Component<TranscriptionProps> = {
  name: "Transcription",
  Icon: MdSubtitles,
  hue: 99,
  inputs: [
    {
      prop: "src",
      label: "Source",
      type: "TRANSCRIPTION",
    },
    {
      prop: "startFrom",
      label: "Start from",
      type: "number",
    },
    {
      prop: "scrollByPage",
      label: "Scroll by page",
      type: "checkbox",
    },
    {
      prop: "animationType",
      label: "Animation type",
      type: "transcription-types",
    },
    {
      prop: "textStyle",
      label: "Text styledivider",
      type: "style",
    },
    {
      prop: "animationStyle",
      label: "Animation styledivider",
      type: "style",
    },
  ],
};
