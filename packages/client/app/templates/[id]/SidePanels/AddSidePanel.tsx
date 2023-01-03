import {
  AllComponents,
  ComponentProps,
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
  defaultProgressbar,
  defaultQRCodeProps,
  defaultTextProps,
  defaultVideoProps,
  defaultTranscriptionProps,
} from "@asius/components";

export const AddSidePanel = ({
  addComp,
}: {
  addComp: (comp: ComponentProps) => void;
}) => {
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
    componentAnimations: [],
  };
  const Add = (title: string, newComp: AllComponents) => {
    return (
      <div
        onClick={() => addComp({ ...newComp, ...baseComp })}
        className="cursor-pointer uppercase font-semibold rounded-md duration-200 shadow-lg hover:bg-primary hover:text-primary-content px-8 py-2"
      >
        <p>{title}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-xl font-bold">Add Elements</h1>
      <div className="w-full space-y-2">
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
        {Add("Progressbar", defaultProgressbar)}
        {Add("QR Code", defaultQRCodeProps)}
      </div>
    </div>
  );
};
