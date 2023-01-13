import {
  AllComponents,
  BaseProps,
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
  defaultProgressbarProps,
  defaultQRCodeProps,
  defaultTextProps,
  defaultVideoProps,
  defaultTranscriptionProps,
} from "@asius/components";
import { PanelTitle } from "../../../../components/PanelTitle";
import { useTemplate } from "../../../../hooks/useTemplate";

export const AddSidePanel = () => {
  const { addComp } = useTemplate();
  const baseComp: BaseProps = {
    id: "0",
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    borderRadius: 0,
    duration: 0,
    from: 0,
    rotation: 0,
    animations: [],
  };
  const Add = (title: string, newComp: AllComponents, description?: string) => {
    return (
      <div
        onClick={() => addComp({ ...newComp, ...baseComp })}
        className="group hover:scale-110 origin-left cursor-pointer rounded-md duration-200 shadow-lg hover:bg-gradient-to-r from-secondary to-primary hover:text-primary-content px-8 py-2 bg-base-200 flex items-center space-x-3"
      >
        <p className="shrink-0 font-semibold ">{title}</p>
        <p className="hidden group-hover:block duration-150 text-xs">
          {description}
        </p>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center space-y-3 overflow-x-clip overflow-y-auto w-full">
      <PanelTitle title="Add elements" />
      <div className="w-full space-y-2">
        {Add("Text", defaultTextProps)}
        {Add("Image", defaultImageProps)}
        {Add("Video", defaultVideoProps)}
        {Add(
          "Transcription",
          defaultTranscriptionProps,
          "Add subtitles to your video"
        )}
        {Add("Audio", defaultAudioProps)}
        {Add("Audiogram", defaultAudiogramProps, "Animate your audio")}
        {Add("Group", defaultDivProps, "Group your elements together")}
        {Add("Gif", defaultGifProps)}
        {Add("Graph", defaultGraphProps, "Animate data")}
        {Add("Lottie", defaultLottieProps, "Add complex animations")}
        {Add("Map", defaultMapProps, "Animate location data")}
        {Add("Mockup", defaultMockupProps, "Add phones and other devices")}
        {Add("Path", defaultPathProps, "Animate SVG paths")}
        {Add("Progressbar", defaultProgressbarProps, "Show video progress")}
        {Add("QR Code", defaultQRCodeProps, "Add QR code to your link")}
      </div>
    </div>
  );
};
