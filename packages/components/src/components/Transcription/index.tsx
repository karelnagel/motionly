import { useEffect, useRef, useState } from "react";
import { continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";
import { useTextStyles } from "../../helpers/useTextStyles";
import z from "zod";
import { TextStyle, TranscriptionAnimationTypes } from "@motionly/inputs";
import { Component } from "../..";

export const TranscriptionWord = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
});
export type TranscriptionWord = z.infer<typeof TranscriptionWord>;

export const TranscriptionProps = z.object({
  src: z.array(TranscriptionWord).or(z.string().url()),
  startFrom: z.number().min(0).optional(),
  textStyle: TextStyle,
  scrollByPage: z.boolean().optional(),
  animationType: TranscriptionAnimationTypes,
  animationStyle: TextStyle,
  height: z.number().min(0).optional(),
});
export type TranscriptionProps = z.infer<typeof TranscriptionProps>;

export const transcription: Component<TranscriptionProps> = {
  zod: TranscriptionProps,
  inputs: {
    src: { text: { label: "Source" } },
    textStyle: { text_style: { label: "Text Style" } },
    animationStyle: { text_style: { label: "Animation Style" } },
    animationType: { select: { label: "Animation Type", options: "transcription-types" } },
    scrollByPage: { checkbox: { label: "Scroll By Page" } },
    startFrom: { number: { label: "Start From" } },
  },
  component: ({ src, startFrom, scrollByPage, animationStyle, animationType, textStyle, height = 0 }) => {
    const { fps } = useVideoConfig();
    const currentFrame = useCurrentFrame();
    let frame = startFrom ? currentFrame + startFrom * fps : currentFrame;
    if (frame < 0) frame = 0;
    const windowRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<HTMLDivElement>(null);

    const [handle] = useState(() => delayRender("Loading Transcription"));
    const [linesRendered, setLinesRendered] = useState(0);
    const lineHeight = (textStyle.lineHeight || 1) * (textStyle.fontSize || 1);
    const linesPerPage = Math.floor(height / lineHeight) || 1;
    const txtStyle = useTextStyles(textStyle);
    const animStyle = useTextStyles(animationStyle);
    const [words, setWords] = useState<TranscriptionWord[]>(typeof src === "string" ? [] : src);
    useEffect(() => {
      if (typeof src !== "string") return;
      fetch(src)
        .then((res) => res.json())
        .then((data) => {
          z.array(TranscriptionWord).parse(data);
          setWords(data);
        })
        .catch((e) => setWords([]));
    }, [src]);

    useEffect(() => {
      if (words) {
        const linesRendered = Math.round(
          (windowRef.current?.getBoundingClientRect().height as number) / (zoomRef.current?.getBoundingClientRect().height as number)
        );
        setLinesRendered(linesRendered);
        continueRender(handle);
      }
    }, [handle, words, frame, linesPerPage, lineHeight]);

    const linesOffset = Math.max(0, !scrollByPage ? linesRendered - linesPerPage : Math.floor((linesRendered - 1) / linesPerPage) * linesPerPage);
    const playedSubs = words.filter((s) => s.start * fps <= frame);
    const unPlayedSubs = words.filter((s) => s.start * fps > frame);
    return (
      <div
        style={{
          height: `${lineHeight * linesPerPage}px`,
          overflow: "clip",
        }}
      >
        <p
          className=""
          style={{
            ...txtStyle,
            overflow: "clip",
            transform: `translateY(-${linesOffset * lineHeight}px)`,
          }}
        >
          <span ref={windowRef}>
            {playedSubs.map((item, i) => {
              let isHighlighted = false;
              if (animationType === "previous-text") isHighlighted = true;
              else if (animationType === "current-word" && i === playedSubs.length - 1) isHighlighted = true;
              return (
                <span key={item.text + item.start + item.end}>
                  <span style={isHighlighted ? animStyle : undefined}>{item.text} </span>
                </span>
              );
            })}
          </span>
          {unPlayedSubs.map((item, i) => (
            <span key={item.text + item.start + item.end}>{item.text} </span>
          ))}
        </p>
        <div ref={zoomRef} style={{ height: lineHeight, position: "absolute" }} />
      </div>
    );
  },
};
