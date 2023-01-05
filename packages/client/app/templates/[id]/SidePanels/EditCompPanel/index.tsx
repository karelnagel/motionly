import { ComponentProps } from "@asius/components";
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
export type SetComp = (c: Partial<ComponentProps>) => void;

export const EditCompPanel = ({
  comp,
  setComp,
  deleteComp,
  addComp,
}: {
  comp: ComponentProps;
  setComp: SetComp;
  deleteComp: (id: string) => void;
  addComp: (comp: ComponentProps) => void;
}) => {
  return (
    <div>
      <div className="grid grid-cols-5 justify-center place-items-center pb-2">
        <div></div>
        <p className="col-span-3 text-xl font-semibold">{comp.id}</p>
        <div className="flex text-xl space-x-1 w-full justify-end">
          <AiFillCopy
            onClick={() => addComp(comp)}
            className="cursor-pointer"
          />
          <AiFillDelete
            onClick={() => deleteComp(comp.id)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <EditGeneral comp={comp} setComp={setComp} />
      <EditAnimation comp={comp} setComp={setComp} />
      {comp.comp === "text" && <EditText comp={comp} setComp={setComp} />}
      {comp.comp === "audio" && <EditAudio comp={comp} setComp={setComp} />}
      {comp.comp === "audiogram" && (
        <EditAudiogram comp={comp} setComp={setComp} />
      )}
      {comp.comp === "div" && <EditDiv comp={comp} setComp={setComp} />}
      {comp.comp === "gif" && <EditGif comp={comp} setComp={setComp} />}
      {comp.comp === "graph" && <EditGraph comp={comp} setComp={setComp} />}
      {comp.comp === "image" && <EditImage comp={comp} setComp={setComp} />}
      {comp.comp === "lottie" && <EditLottie comp={comp} setComp={setComp} />}
      {comp.comp === "map" && <EditMap comp={comp} setComp={setComp} />}
      {comp.comp === "mockup" && <EditMockup comp={comp} setComp={setComp} />}
      {comp.comp === "path" && <EditPath comp={comp} setComp={setComp} />}
      {comp.comp === "progressbar" && (
        <EditProgressbar comp={comp} setComp={setComp} />
      )}
      {comp.comp === "qrcode" && <EditQRCode comp={comp} setComp={setComp} />}
      {comp.comp === "transcription" && (
        <EditTranscription comp={comp} setComp={setComp} />
      )}
      {comp.comp === "video" && <EditVideo comp={comp} setComp={setComp} />}
    </div>
  );
};
