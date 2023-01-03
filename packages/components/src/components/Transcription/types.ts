import { TextStyle } from "../../types";

export const TranscriptionAnimationTypes = {
    "current-word": "Current word",
    "previous-text": "Previous text",
  };
  export interface TranscriptionWord {
    text: string;
    start: number;
    end: number;
  }
  export const TranscriptionScrollType = {
    "page-by-page": "Page by page",
    "line-by-line": "Line by line",
  };
  export interface TranscriptionAnimation {
    type: keyof typeof TranscriptionAnimationTypes;
    textStyle: TextStyle;
  }
  export interface TranscriptionProps {
    type: "transcription";
    words: TranscriptionWord[];
    textStyle: TextStyle;
    scrollType: keyof typeof TranscriptionScrollType;
    animation: TranscriptionAnimation;
    height: number;
  }