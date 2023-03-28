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
import { useSelected } from "./hooks/useSelected";
import { ComponentProps, transformProps } from "@motionly/base";
import { useAnimation } from "./hooks/useAnimations";
import { getDuration, getFrom } from "@motionly/base";
import { Shape } from "./components/Shape";
import { ReactNode, useMemo, useRef } from "react";
import { MotionBlur } from "./MotionBlur";
import { Confetti } from "./components/Confetti";
import { useTextAnimations } from "./hooks/useTextAnimations";

export const Component = (comp: ComponentProps) => {
  const { fps, durationInFrames } = useVideoConfig();
  const ref = useRef<HTMLDivElement | null>(null);
  const width = comp.width || ref.current?.offsetWidth || 0;
  const height = comp.height || ref.current?.offsetHeight || 0;

  const text =
    "text" in comp
      ? useTextAnimations(
          Object.values(comp.animations?.byIds || {}),
          comp.text
        )
      : "";

  const from = useMemo(
    () => Math.ceil(getFrom(durationInFrames, (comp.from || 0) * fps)),
    [durationInFrames, fps, comp.from]
  );

  const duration = useMemo(
    () =>
      Math.ceil(
        getDuration(
          durationInFrames,
          (comp.from || 0) * fps,
          (comp.duration || 0) * fps
        )
      ),
    [durationInFrames, fps, comp.duration, comp.from]
  );
  return (
    <MotionBlur motion={comp.motionBlur}>
      <Sequence
        from={from}
        durationInFrames={duration <= 0 ? 1 : duration}
        layout="none"
      >
        <Freeze
          frame={comp.freeze !== undefined ? fps * comp.freeze : undefined}
        >
          <Loop
            durationInFrames={
              comp.loopDuration ? fps * comp.loopDuration : undefined
            }
          >
            <InsideSequence {...comp}>
              <div ref={ref} style={{ height: "100%", width: `100%` }}>
                {comp.comp === "div" && <Div {...comp} />}
                {comp.comp === "image" && <Image {...comp} />}
                {comp.comp === "text" && <Text {...comp} text={text} />}
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
            </InsideSequence>
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
  if (frame === undefined) return <>{children}</>;
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
  borderRadius = 0,
  height: inputHeight,
  opacity = 1,
  rotation,
  animations,
  width: inputWidth,
  x,
  y,
  transforms,
  children,
}: ComponentProps & { children: ReactNode }) => {
  const { setSelected, selectedRef: divRef, selected } = useSelected();
  const animation = useAnimation();
  const transformStyle = useMemo(
    () =>
      transforms
        ?.map((t) => {
          const { units } = transformProps[t.prop];
          return `${t.prop}(${t.value}${units || ""})`;
        })
        .join(" ") || "",
    [transforms]
  );
  const anims = Object.values(animations?.byIds || {});
  const transformAnimations =
    anims
      .map((anim) => {
        const prop = transformProps[anim.prop as keyof typeof transformProps];
        if (!prop) return "";
        return `${anim.prop}(${animation(anim) || 0}${prop.units || ""})`;
      })
      .join(" ") || "";

  const opacityAnimations = anims.filter((a) => a.prop === "opacity");
  const opac = opacityAnimations.length
    ? opacity * opacityAnimations.reduce((acc, a) => acc * animation(a), 1)
    : opacity;

  const borderAnimations = anims.filter((a) => a.prop === "borderRadius");
  const border = borderAnimations.length
    ? borderRadius + borderAnimations.reduce((acc, a) => acc + animation(a), 1)
    : borderRadius;
  return (
    <>
      <div
        ref={(e) => {
          if (divRef && selected === id) divRef.current = e;
        }}
        onClick={(e) => {
          setSelected(id);
          e.stopPropagation();
        }}
        style={{
          opacity: opac,
          borderRadius: border,
          cursor: "pointer",
          display: "flex",
          overflow: "hidden",
          width: inputWidth || "100%",
          height: inputHeight || "100%",
          position: "absolute",
          userSelect: "none",
          transform: `translate(${x || 0}px,${y || 0}px) ${
            (transformStyle + transformAnimations).includes("perspective")
              ? ""
              : "perspective(1000px)"
          } rotate(${
            rotation || 0
          }deg) ${transformStyle} ${transformAnimations}`, // For some reason, this messes up x and y
        }}
      >
        {children}
      </div>
    </>
  );
};
