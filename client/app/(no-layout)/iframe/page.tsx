"use client";

import { TemplateType } from "@motionly/base";
import { Player, PlayerProps } from "@motionly/player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function IFrame() {
  const [template, setTemplate] = useState<TemplateType>();
  const router = useRouter();
  const { autoPlay, controls, clickToPlay, loop } =
    router.query as Partial<PlayerProps>;

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data.call === "setTemplate") {
        setTemplate(event.data.template);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  });

  if (!template) return <div>Loading...</div>;
  return (
    <Player
      style={{ width: "100%" }}
      template={template}
      autoPlay={!!autoPlay}
      loop={!!loop}
      controls={!!controls}
      clickToPlay={!!clickToPlay}
    />
  );
}
