import { useEffect, useRef, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getTextStyle } from "@asius/base";
import { StyleAndClass } from "@asius/base";
import { TranscriptionProps } from "@asius/base";
export * from "./default";

export const Transcription = ({
  textStyle,
  src: words,
  style,
  className,
  animationStyle,
  animationType,
  scrollByPage,
  startFrom,
}: TranscriptionProps & StyleAndClass) => {
  const { fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();
  let frame = startFrom ? currentFrame + startFrom * fps : currentFrame;
  if (frame < 0) frame = 0;
  const windowRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [handle] = useState(() => delayRender());
  const [linesRendered, setLinesRendered] = useState(0);
  const lineHeight = (textStyle.lineHeight || 1) * (textStyle.fontSize || 1);
  const ref = useRef<HTMLDivElement>(null);
  const [linesPerPage, setLinesPerPage] = useState(1);

  useEffect(() => {
    const height = ref.current?.parentElement?.offsetHeight || 1;
    setLinesPerPage(Math.floor(height / lineHeight));
    if (words && words.length > 0 && linesPerPage) {
      const linesRendered = Math.round(
        (windowRef.current?.getBoundingClientRect().height as number) /
          (zoomRef.current?.getBoundingClientRect().height as number)
      );
      setLinesRendered(linesRendered);
      continueRender(handle);
    }
  }, [handle, words, frame, linesPerPage, lineHeight]);

  const linesOffset = Math.max(
    0,
    !scrollByPage
      ? linesRendered - linesPerPage
      : Math.floor((linesRendered - 1) / linesPerPage) * linesPerPage
  );
  const playedSubs = words.filter((s) => s.start * fps <= frame);
  const unPlayedSubs = words.filter((s) => s.start * fps > frame);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: `${lineHeight * linesPerPage}px`,
        overflow: "clip",
        ...style,
      }}
    >
      <p
        className=""
        style={{
          ...getTextStyle(textStyle),
          overflow: "clip",
          transform: `translateY(-${linesOffset * lineHeight}px)`,
        }}
      >
        <span ref={windowRef}>
          {playedSubs.map((item, i) => {
            let isHighlighted = false;
            if (animationType === "previous-text") isHighlighted = true;
            else if (
              animationType === "current-word" &&
              i === playedSubs.length - 1
            )
              isHighlighted = true;
            return (
              <span key={i}>
                <span
                  style={
                    isHighlighted ? getTextStyle(animationStyle) : undefined
                  }
                >
                  {item.text}{" "}
                </span>
              </span>
            );
          })}
        </span>
        {unPlayedSubs.map((item, i) => (
          <span key={i}>{item.text} </span>
        ))}
      </p>
      <div ref={zoomRef} style={{ height: lineHeight, position: "absolute" }} />
    </div>
  );
};
