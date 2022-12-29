import { TranscriptionCompProps } from "@asius/types";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditTranscription = ({
  comp,
  setComp,
}: {
  comp: TranscriptionCompProps;
  setComp: SetComp;
}) => {
  return <EditSection title="Transcription">a</EditSection>;
};
