import { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const examples = [
  {
    title: "Podcast",
    video: "/video.mp4",
  },
  {
    title: "Year in review",
    video: "/div.mp4",
  },
  {
    title: "Mockups",
    video: "/video.mp4",
  },
  {
    title: "Tweets",
    video: "/div.mp4",
  },
  {
    title: "News/updates",
    video: "/video.mp4",
  },
];

export const Examples = () => {
  const [mouseIn, setMouseIn] = useState(false);
  const [current, setCurrent] = useState(0);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    vidRef.current.currentTime = 0;
    vidRef.current.play();
    const interval = setInterval(() => {
      if (mouseIn) {
        return;
      }
      setCurrent((current + 1) % examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current, mouseIn]);

  return (
    <div className="space-y-6 max-w-screen-xl m-auto">
      <div className="max-w-xl leading-[1.2] space-y-6">
        <h2 className="text-[50px] font-semibold leading-[1.1] title">
          Video templates for every purpose
        </h2>
        <p className="text-xl  leading-[1.4]">
          Start with a flexible template, then customize to fit your style and
          professional needs with our website builder.
        </p>
      </div>
      <div className="flex items-center h-full justify-between">
        <div className="flex flex-col items-start text-[40px] font-semibold leading-none">
          {examples.map(({ title }, i) => (
            <div
              key={i}
              className="relative cursor-pointer group py-3"
              onMouseEnter={() => {
                setMouseIn(true);
                setCurrent(i);
              }}
              onMouseOut={() => {
                console.log("out");
                setMouseIn(false);
              }}
            >
              <div className="flex items-end space-x-3 ">
                <p
                  className={`${
                    current === i ? "text-white" : "text-stone-500"
                  } duration-300`}
                >
                  {title}
                </p>
                <MdArrowForwardIos
                  className={`text-3xl leading-none mb-1 duration-500  ${
                    current === i
                      ? "translate-x-0 opacity-100"
                      : "opacity-0 -translate-x-2"
                  }`}
                />
              </div>
              <div
                className={`absolute left-0 bottom-1 bg-white h-[3px]  duration-[400ms] delay-150 ${
                  current === i ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="relative  h-[400px] aspect-video">
          {examples.map(({ video }, i) => (
            <video
              key={i}
              ref={current === i ? vidRef : null}
              src={video}
              className={`absolute top-0 h-full ease-out rounded-xl  ${
                current === i
                  ? "opacity-100 translate-x-0 z-20 duration-700"
                  : "opacity-0 -translate-x-10 z-0"
              }`}
              autoPlay
              preload="auto"
              muted
              loop
            />
          ))}
        </div>
      </div>
    </div>
  );
};
