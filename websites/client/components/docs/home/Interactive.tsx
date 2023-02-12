import { Player } from "@motionly/player";
import { useState } from "react";
import { interactive } from "../../../videos/examples/interactive";

export const Interactive = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [color, setColor] = useState("#2F9AD6");
  const Color = ({ color: buttonColor }: { color: string }) => {
    return (
      <div
        onClick={() => setColor(buttonColor)}
        style={{
          background: buttonColor,
          borderWidth: color === buttonColor ? `3px` : undefined,
        }}
        className="w-10 h-10 rounded-full cursor-pointer border-base-content"
      />
    );
  };
  const template = interactive({ name, color, birthday });
  return (
    <div className="space-y-4 md:space-y-10">
      <div className="max-w-4xl space-y-5">
        <h2 className="text-[50px] md:text-[75px] leading-none title font-semibold">
          Whatever your needs are, Motionly is for you
        </h2>
        <p className="font-light text-[18px] md:text-[22px]">
          Play the video, then tweak the parameters below the video.
        </p>
      </div>
      <div className="flex gap-0 md:gap-40 flex-col md:flex-row">
        <div className="flex flex-col py-4 md:py-7 min-w-[350px] space-y-3">
          <input
            className="input  w-full formbox"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            type="date"
            className="input w-full formbox"
            placeholder="Enter your birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.currentTarget.value)}
          />
          <p className="font-light text-[22px] pt-5">
            Select your favourite color
          </p>
          <div className="flex space-x-5">
            <Color color="#2F9AD6" />
            <Color color="#DD654B" />
            <Color color="#53D888" />
          </div>
        </div>
        <div className="h-full w-full">
          <Player
            template={template}
            controls
            className="rounded-lg md:rounded-[40px] bg-base-content"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
