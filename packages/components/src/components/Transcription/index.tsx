import { useEffect, useRef, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getTextStyle } from "../../helpers";
import { StyleAndClass } from "../../types";
import { TranscriptionProps } from "../../types/components";
export * from "./default";

export const Transcription = ({
  textStyle,
  animation,
  words,
  style,
  className,
  scrollType,
}: TranscriptionProps & StyleAndClass) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const windowRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [handle] = useState(() => delayRender());
  const [linesRendered, setLinesRendered] = useState(0);
  const lineHeight = (textStyle.lineHeight || 1) * (textStyle.fontSize || 1);
  const ref = useRef<HTMLDivElement>(null);
  const height = ref.current?.parentElement?.offsetHeight || 1;
  const linesPerPage = Math.floor(height / lineHeight);

  useEffect(() => {
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
    scrollType === "line-by-line"
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
            if (animation.type === "previous-text") isHighlighted = true;
            else if (
              animation.type === "current-word" &&
              i === playedSubs.length - 1
            )
              isHighlighted = true;
            return (
              <span key={i}>
                <span
                  style={
                    isHighlighted
                      ? getTextStyle(animation.textStyle)
                      : undefined
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
