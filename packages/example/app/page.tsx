"use client";

import styles from "./page.module.css";
import { COMPONENTS } from "./components";
import { Player } from "@asius/player";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("Your mom");
  const [username, setUsername] = useState("@yourmom");
  const [tweet, setTweet] = useState("hello world");
  const [container, setContainer] = useState("#FFFFFF");
  const modifications = [
    { id: "name", text: name },
    { id: "username", text: username },
    { id: "tweet", text: tweet },
    { id: "container", backgroundColor: container },
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
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="color"
          placeholder="container"
          value={container}
          onChange={(e) => setContainer(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="tweet"
          value={tweet}
          onChange={(e) => setTweet(e.currentTarget.value)}
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
