import { Div } from "./components/Div";
import { Text } from "./components/Text";
import { Image } from "./components/Image";
import {
  Freeze as RemotionFreeze,
  Loop as RemotionLoop,
  Sequence,
  useVideoConfig,
} from "remotion";
import { Audio } from "./components/Audio";
import { Audiogram } from "./components/Audiogram";
import { Graph } from "./components/Graph";
import { Map } from "./components/Map";
import { Mockup } from "./components/Mockup/index";
import { Progressbar } from "./components/Progressbar";
import { QRCode } from "./components/QRCode";
import { Video } from "./components/Video";
import { Transcription } from "./components/Transcription/index";
import { Lottie } from "./components/Lottie";
import { Gif } from "./components/Gif";
import { Path } from "./components/Path";
import { useSelected } from "./SelectedContext";
import { ComponentProps, transformProps } from "@motionly/base";
import { useAnimation } from "./useAnimations";
import { getDuration, getFrom } from "@motionly/base";
import { Shape } from "./components/Shape";
import { ReactNode, useRef } from "react";
import { MotionBlur } from "./MotionBlur";
import { Confetti } from "./components/Confetti";

export const Component = (comp: ComponentProps) => {
  const { fps, durationInFrames } = useVideoConfig();
  const from = Math.floor(getFrom(durationInFrames, (comp.from || 0) * fps));
  const duration = Math.floor(
    getDuration(
      durationInFrames,
      (comp.from || 0) * fps,
      (comp.duration || 0) * fps
    )
  );
  return (
    <MotionBlur motion={comp.motionBlur}>
      <Sequence from={from} durationInFrames={duration} layout="none">
        <Freeze frame={comp.freeze ? fps * comp.freeze : undefined}>
          <Loop
            durationInFrames={
              comp.loopDuration ? fps * comp.loopDuration : undefined
            }
          >
            <InsideSequence {...comp} />
          </Loop>
        </Freeze>
      </Sequence>
    </MotionBlur>
  );
};

export const Freeze = ({
  frame,
  children,
}: {
  frame?: number;
  children: ReactNode;
}) => {
  if (!frame) return <>{children}</>;
  else
    return (
      <RemotionFreeze frame={frame}>
        <>{children}</>
      </RemotionFreeze>
    );
};

export const Loop = ({
  durationInFrames,
  children,
}: {
  durationInFrames?: number;
  children: ReactNode;
}) => {
  if (!durationInFrames) return <>{children}</>;
  else
    return (
      <RemotionLoop durationInFrames={durationInFrames} layout="none">
        <>{children}</>
      </RemotionLoop>
    );
};

const InsideSequence = ({
  id,
  borderRadius,
  animations = [],
  height: inputHeight,
  opacity,
  rotation,
  width: inputWidth,
  x,
  y,
  transform,
  ...comp
}: ComponentProps) => {
  const { setSelected, divRef, selected } = useSelected();
  const animation = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const width = inputWidth || ref.current?.offsetWidth || 0;
  const height = inputHeight || ref.current?.offsetHeight || 0;

  const transformStyle =
    transform
      ?.map((t) => {
        const { units } = transformProps[t.prop];
        return `${t.prop}(${t.value}${units || ""})`;
      })
      .join(" ") || "";

  const transformAnimations =
    animations
      .map((anim) => {
        const prop = transformProps[anim.prop as keyof typeof transformProps];
        if (!prop) return "";
        return `${anim.prop}(${animation(anim)}${prop.units || ""})`;
      })
      .join(" ") || "";
  return (
    <>
      {id && process.env.DEBUG && <Debug title={`${id} - ${comp.comp}`} />}

      <div
        ref={(e) => {
          if (ref) ref.current = e;
          if (divRef && selected === id) divRef.current = e;
        }}
        onClick={(e) => {
          setSelected(id);
          e.stopPropagation();
        }}
        style={{
          opacity:
            (opacity || 1) *
            animations
              .filter((a) => a.prop === "opacity")
              .reduce((acc, a) => acc * animation(a), 1),
          borderRadius:
            (borderRadius || 0) +
            animations
              .filter((a) => a.prop === "borderRadius")
              .reduce((acc, a) => acc + animation(a), 1),
          cursor: "pointer",
          display: "flex",
          overflow: "hidden",
          width: width || "100%",
          height: height || "100%",
          position: "absolute",
          top: y,
          left: x,
          userSelect: "none",
          transform: `rotate(${
            rotation || 0
          }deg) ${transformStyle} ${transformAnimations}`, // For some reason, this messes up x and y
        }}
      >
        {comp.comp === "div" && <Div {...comp} />}
        {comp.comp === "image" && <Image {...comp} />}
        {comp.comp === "text" && <Text {...comp} />}
        {comp.comp === "audio" && <Audio {...comp} />}
        {comp.comp === "audiogram" && (
          <Audiogram {...comp} width={width} height={height} />
        )}
        {comp.comp === "graph" && (
          <Graph {...comp} width={width} height={height} />
        )}
        {comp.comp === "map" && <Map {...comp} />}
        {comp.comp === "mockup" && <Mockup {...comp} />}
        {comp.comp === "progressbar" && (
          <Progressbar {...comp} width={width} height={height} />
        )}
        {comp.comp === "qrcode" && <QRCode {...comp} />}
        {comp.comp === "video" && <Video {...comp} />}
        {comp.comp === "transcription" && (
          <Transcription {...comp} height={height} />
        )}
        {comp.comp === "lottie" && <Lottie {...comp} />}
        {comp.comp === "gif" && <Gif {...comp} />}
        {comp.comp === "path" && <Path {...comp} />}
        {comp.comp === "confetti" && <Confetti {...comp} />}
        {comp.comp === "shape" && (
          <Shape {...comp} width={width} height={height} />
        )}
      </div>
    </>
  );
};

export const Debug = ({ title }: { title: string }) => {
  return (
    <p
      style={{
        position: "fixed",
        opacity: 0.6,
        zIndex: 100,
        top: 0,
        left: 0,
        background: "white",
        fontSize: "20px",
        margin: 0,
      }}
    >
      {title}
    </p>
  );
};
