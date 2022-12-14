"use client";

import styles from "./page.module.css";
import { COMPONENTS } from "./components";
import { Player } from "@asius/player";
import { useState } from "react";
import { TranscriptionAnimationTypes } from "@asius/types";

export default function Home() {
  const [title, setTitle] = useState("Title");
  const [titleOutline, setTitleOutline] = useState("#FFFFFF");
  const [titleColor, setTitleColor] = useState("#000000");
  const [primaryColor, setPrimaryColor] = useState("#FFff00");

  const [transcriptionType, setTranscriptionType] =
    useState<keyof typeof TranscriptionAnimationTypes>("current-word");

  const modifications = [
    {
      id: "title",
      text: title,
      textStyle: {
        outline: { width: 10, color: titleOutline },
        color: titleColor,
        fontSize: 100,
        textAlign: "center",
      },
    },
    { id: "container", backgroundColor: titleOutline },
    {
      id: "transcription",
      animation: {
        type: transcriptionType,
        textStyle: { outline: { width: 10, color: "blue" }, color: "white" },
      },
    },
    { id: "bar1", color: primaryColor },
    { id: "audiogram", color: primaryColor },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main} style={{ width: "600px", margin: "auto" }}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Asius!</a>
        </h1>
        <p>Local player</p>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <input
          type="color"
          placeholder="container"
          value={titleOutline}
          onChange={(e) => setTitleOutline(e.currentTarget.value)}
        />
        <select
          value={transcriptionType}
          onChange={(e) =>
            setTranscriptionType(e.currentTarget.value as keyof typeof TranscriptionAnimationTypes)
          }
        >
          {Object.keys(TranscriptionAnimationTypes).map((key) => (
            <option value={key} key={key}>
              {TranscriptionAnimationTypes[key as keyof typeof TranscriptionAnimationTypes]}
            </option>
          ))}
        </select>
        <input
          type="color"
          placeholder="container"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.currentTarget.value)}
        />
        <Player
          modifications={modifications as any}
          components={COMPONENTS}
          duration={10}
          fps={30}
          height={1080}
          width={1080}
          style={{ width: "100%" }}
          controls
        />
      </main>
    </div>
  );
}
