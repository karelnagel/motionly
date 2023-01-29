import { ComponentProps } from "@motionly/base";
import { Player } from "@motionly/player";
import { useState } from "react";

export const template = ({
  name,
  birthday,
  color,
}: {
  name: string;
  birthday: string;
  color: string;
}): ComponentProps[] => [
  {
    comp: "text",
    text: name,
    id: "name",
    x: 100,
    textStyle: {
      fontSize: 75,
      lineHeight: 1,
      color: {
        type: "basic",
        color,
      },
    },
  },
  {
    comp: "text",
    text: birthday,
    x: 100,
    y: 100,
    id: "date",
    textStyle: {
      fontSize: 75,
      lineHeight: 1,
      color: {
        type: "basic",
        color,
      },
    },
  },
];

export const Interactive = () => {
  const [name, setName] = useState("Steve Jobs");
  const [birthday, setBirthday] = useState("");
  const [selectedColor, setColor] = useState("#2F9AD6");
  const Color = ({ color }: { color: string }) => {
    return (
      <div
        onClick={() => setColor(color)}
        style={{
          background: color,
          borderWidth: selectedColor === color ? `3px` : undefined,
        }}
        className="w-10 h-10 rounded-full cursor-pointer border-base-content"
      />
    );
  };
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
            className="input bg-base-300 w-full"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            type="date"
            className="input bg-base-300 w-full"
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
            comps={template({ name, birthday, color: selectedColor })}
            duration={10}
            fps={30}
            height={1080}
            controls
            width={1920}
            className="rounded-lg md:rounded-[40px] bg-base-content"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
