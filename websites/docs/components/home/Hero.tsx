import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import laptop from "../../public/laptop.png";
import { Bubble } from "../Bubble";

export const Hero = () => {
  return (
    <div className="relative flex items-center justify-between px-4 flex-col-reverse md:flex-row my-10 md:my-32">
      <div className="flex flex-col space-y-6 items-start max-w-lg">
        <h1 className="title font-semibold uppercase leading-[1] text-[50px] md:text-[85px] tracking-wide">
          Automate your content
        </h1>
        <p className="text-[22px] leading-[30px] font-light">
          Automate your video editing and integrate
          <br /> videos with dynamic data on your site.
        </p>
        <Link
          href="#contact"
          className="btn btn-gradient text-[24px] font-semibold leading-[30px] flex items-center space-x-3"
        >
          Get started
          <IoIosArrowForward className="text-3xl" />
        </Link>
      </div>
      <div>
        <div className="relative w-[95%] mb-10 md:mb-0">
          <Bubble width={65} top={32} left={6} />
          <Bubble width={6} top={99} left={65} />
          <Bubble width={12} top={84} left={83} />
          <Bubble width={10} top={-10} left={65} />
          <Bubble width={25} top={-8} left={80} />
          <video
            style={{
              transform: "perspective(1000px) rotateY(-13deg) rotateX(10deg)",
              height: "60%",
              width: "78%",
              top: "10%",
              left: "18%",
            }}
            className="absolute object-cover rounded-lg"
            src="/examples/tweets.webm"
            autoPlay
            loop
            muted
          />

          <Image src={laptop} alt="laptop" className="relative" />
        </div>
      </div>
    </div>
  );
};
