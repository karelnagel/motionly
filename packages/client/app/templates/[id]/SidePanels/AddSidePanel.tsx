import {
  CompProps,
  defaultAudiogramProps,
  defaultAudioProps,
  defaultDivProps,
  defaultGifProps,
  defaultGraphProps,
  defaultImageProps,
  defaultLottieProps,
  defaultMapProps,
  defaultMockupProps,
  defaultPathProps,
  defaultProgressBar,
  defaultQrCodeProps,
  defaultTextProps,
  defaultVideoProps,
} from "@asius/types";
import { defaultTranscriptionProps } from "@asius/types/src/defaults/transcription";

export const AddSidePanel = ({
  setComps,
  comps,
}: {
  setComps: (comps: CompProps[]) => void;
  comps: CompProps[];
}) => {
  const getRandomId = () => {
    return Math.random().toString(36).substring(7);
  };
  const Add = (title: string, newComp: CompProps) => {
    return (
      <div
        onClick={() => setComps([...comps, { ...newComp, id: getRandomId() }])}
        className="cursor-pointer uppercase font-semibold text-lg rounded-md duration-200 shadow-lg hover:bg-primary hover:text-primary-content px-8 py-2"
      >
        <p>{title}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-xl font-bold">Add Elements</h1>
      {Add("Text", defaultTextProps)}
      {Add("Image", defaultImageProps)}
      {Add("Video", defaultVideoProps)}
      {Add("Transcription", defaultTranscriptionProps)}
      {Add("Audio", defaultAudioProps)}
      {Add("Audiogram", defaultAudiogramProps)}
      {Add("Div", defaultDivProps)}
      {Add("Gif", defaultGifProps)}
      {Add("Graph", defaultGraphProps)}
      {Add("Lottie", defaultLottieProps)}
      {Add("Map", defaultMapProps)}
      {Add("Mockup", defaultMockupProps)}
      {Add("Path", defaultPathProps)}
      {Add("Progressbar", defaultProgressBar)}
      {Add("QR Code", defaultQrCodeProps)}
    </div>
  );
};
