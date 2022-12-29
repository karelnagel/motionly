import { CompProps } from "@asius/types";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import { EditAnimation } from "./EditAnimation";
import { EditAudio } from "./EditAudio";
import { EditAudiogram } from "./EditAudiogram";
import { EditDiv } from "./EditDiv";
import { EditGeneral } from "./EditGeneral";
import { EditGif } from "./EditGif";
import { EditGraph } from "./EditGraph";
import { EditImage } from "./EditImage";
import { EditLottie } from "./EditLottie";
import { EditMap } from "./EditMap";
import { EditMockup } from "./EditMockup";
import { EditPath } from "./EditPath";
import { EditProgressbar } from "./EditProgressbar";
import { EditQRCode } from "./EditQRCode";
import { EditText } from "./EditText";
import { EditTranscription } from "./EditTranscription";
import { EditVideo } from "./EditVideo";
export type SetComp = (c: CompProps) => void;

export const EditCompPanel = ({ comp, setComp }: { comp: CompProps; setComp: SetComp }) => {
  return (
    <div>
      <div className="grid grid-cols-5 justify-center place-items-center pb-2">
        <div></div>
        <p className="col-span-3 text-xl font-semibold">{comp.id}</p>
        <div className="flex text-xl space-x-1 w-full justify-end">
          <AiFillCopy />
          <AiFillDelete />
        </div>
      </div>
      <EditGeneral comp={comp} setComp={setComp} />
      <EditAnimation comp={comp} setComp={setComp} />
      {comp.type === "text" && <EditText comp={comp} setComp={setComp} />}
      {comp.type === "audio" && <EditAudio comp={comp} setComp={setComp} />}
      {comp.type === "audiogram" && <EditAudiogram comp={comp} setComp={setComp} />}
      {comp.type === "div" && <EditDiv comp={comp} setComp={setComp} />}
      {comp.type === "gif" && <EditGif comp={comp} setComp={setComp} />}
      {comp.type === "graph" && <EditGraph comp={comp} setComp={setComp} />}
      {comp.type === "image" && <EditImage comp={comp} setComp={setComp} />}
      {comp.type === "lottie" && <EditLottie comp={comp} setComp={setComp} />}
      {comp.type === "map" && <EditMap comp={comp} setComp={setComp} />}
      {comp.type === "mockup" && <EditMockup comp={comp} setComp={setComp} />}
      {comp.type === "path" && <EditPath comp={comp} setComp={setComp} />}
      {comp.type === "progressbar" && <EditProgressbar comp={comp} setComp={setComp} />}
      {comp.type === "qrcode" && <EditQRCode comp={comp} setComp={setComp} />}
      {comp.type === "transcription" && <EditTranscription comp={comp} setComp={setComp} />}
      {comp.type === "video" && <EditVideo comp={comp} setComp={setComp} />}
    </div>
  );
};
