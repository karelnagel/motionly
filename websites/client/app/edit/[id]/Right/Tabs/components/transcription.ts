import {
  TranscriptionAnimationTypes,
  TranscriptionProps,
} from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const transcription: Component<TranscriptionProps> = {
  name: "Transcription",
  Icon: IoIosSettings,
  hue: 99,
  inputs: [
    {
      prop: "textStyle",
      type: "style",
    },
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
      type: "select",
      options: Object.entries(TranscriptionAnimationTypes).map(
        ([value, label]) => ({
          value,
          label,
        })
      ),
    },
    {
      prop: "animationStyle",
      type: "style",
    },
  ],
};
