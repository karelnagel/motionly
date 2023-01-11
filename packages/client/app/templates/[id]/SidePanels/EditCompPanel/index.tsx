import { ComponentProps } from "@asius/components";
import { ReactNode, useState } from "react";
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

export const PanelTitle = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center">
      <p className="text-xl font-semibold shrink-0 py-1">{title}</p>
      <div className="flex text-xl space-x-1 w-full justify-end">
        {children}
      </div>
    </div>
  );
};
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
  const [showAnimations, setShowAnimations] = useState(false);
  const Tab = ({ title, value }: { title: string; value: boolean }) => {
    return (
      <div
        className={`${
          showAnimations === value
            ? "gradient bg-clip-text text-transparent"
            : ""
        } text-center cursor-pointer`}
        onClick={() => setShowAnimations(value)}
      >
        <p>{title}</p>
        {showAnimations === value && (
          <div className="h-[2px] w-full gradient rounded-full"></div>
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full">
      <PanelTitle title={`${comp.comp}-${comp.id}`}>
        <div className="tooltip" data-tip="⌘ + C">
          <AiFillCopy
            onClick={() => addComp(comp)}
            className="cursor-pointer"
          />
        </div>
        <div className="tooltip" data-tip="⌫">
          <AiFillDelete
            onClick={() => deleteComp(comp.id)}
            className="cursor-pointer"
          />
        </div>
      </PanelTitle>
      <div className="grid grid-cols-2 my-2 font-bold">
        <Tab title="Props" value={false} />
        <Tab title="Animations" value={true} />
      </div>
      {showAnimations ? (
        <div className="mt-4 overflow-y-auto">
          <EditAnimation comp={comp} setComp={setComp} />
        </div>
      ) : (
        <div className="mt-4 w-full overflow-y-auto">
          <EditGeneral comp={comp} setComp={setComp} />

          {comp.comp === "text" && <EditText comp={comp} setComp={setComp} />}
          {comp.comp === "audio" && <EditAudio comp={comp} setComp={setComp} />}
          {comp.comp === "audiogram" && (
            <EditAudiogram comp={comp} setComp={setComp} />
          )}
          {comp.comp === "div" && <EditDiv comp={comp} setComp={setComp} />}
          {comp.comp === "gif" && <EditGif comp={comp} setComp={setComp} />}
          {comp.comp === "graph" && <EditGraph comp={comp} setComp={setComp} />}
          {comp.comp === "image" && <EditImage comp={comp} setComp={setComp} />}
          {comp.comp === "lottie" && (
            <EditLottie comp={comp} setComp={setComp} />
          )}
          {comp.comp === "map" && <EditMap comp={comp} setComp={setComp} />}
          {comp.comp === "mockup" && (
            <EditMockup comp={comp} setComp={setComp} />
          )}
          {comp.comp === "path" && <EditPath comp={comp} setComp={setComp} />}
          {comp.comp === "progressbar" && (
            <EditProgressbar comp={comp} setComp={setComp} />
          )}
          {comp.comp === "qrcode" && (
            <EditQRCode comp={comp} setComp={setComp} />
          )}
          {comp.comp === "transcription" && (
            <EditTranscription comp={comp} setComp={setComp} />
          )}
          {comp.comp === "video" && <EditVideo comp={comp} setComp={setComp} />}
        </div>
      )}
    </div>
  );
};
