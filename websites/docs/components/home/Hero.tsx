import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const examples = [
  {
    title: "Podcast",
    video: "/examples/podcasts.webm",
  },
  {
    title: "Year in review",
    video: "/examples/yir.webm",
  },
  {
    title: "Mockups",
    video: "/examples/mockups.webm",
  },
  {
    title: "Tweets",
    video: "/examples/tweets.webm",
  },
  {
    title: "Subtitles",
    video: "/examples/subtitles.webm",
  },
];
export const Hero = () => {
  return (
    <div className="relative overflow-hidden ">
      <Image
        className=" absolute bottom-0 object-cover "
        alt=""
        src={"/figma-bg.png"}
        layout="fill"
      ></Image>
      <div id="laptop" className=" relative pt-24 px-6 max-h-screen max-w-screen-xl m-auto">
        <div className=" absolute hidden lg:flex  -right-[400px] top-[140px] w-[1300px] h-[800px]
        animate-slide-from-right-1800">
          <video
            height={832}
            width={1280}
            src="/examples/podcasts.webm"
            muted
            autoPlay
            loop
            className="absolute h-[47.2%] w-[46.3%] left-[25.5%] top-[24.8%] object-fill rounded-md "
          ></video>
          <Image
            src={"/laptopreal.png"}
            alt=""
            height={832}
            width={1280}
            className=" object-cover  "
          >
          </Image>
        </div>
        <div className=" flex justify-between m-auto   max-w-screen-xl min-h-screen md:text-left pt-10 pb-3 md:pt-32 space-y-4">
          <div className="flex  flex-col max-w-xl min-h-fill   ">
            <div className="relative max-w-lg space-y-4 flex flex-col ">
              <h1 className="title text-[50px] md:text-[85px] font-semibold leading-[1.1]
              animate-slide-from-left-300">
                AUTOMATE
              </h1>
              <h1 className="title text-[50px] md:text-[85px] font-semibold leading-[1.1]
              animate-slide-from-left-400 ">
                YOUR
              </h1>
              <h1 className="title text-[50px] md:text-[85px] font-semibold leading-[1.1]
              animate-slide-from-left-600">
                Content
              </h1>
              <p className=" text-[16px] md:text-[22px] leading-[1.6] font-normal text-left 
              animate-slide-from-left-2400">
                Automate your video editing and integrate videos with dynamic data on your site.
              </p>
            </div>
            <div className="flex space-x-5 md:space-x-10 pt-12 text-xl md:text-2xl font-medium
            animate-slide-from-left-2000">
              <a href="#Contact" className=" animate-pulse rounded-full p-4 px-4 text-gray-300 bg-gradient-to-l from-secondary to-primary transition transform hover:!opacity-100 hover:scale-110 duration-500 "
              >
                Get started
                <IoIosArrowForward className="inline text-4xl pb-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
