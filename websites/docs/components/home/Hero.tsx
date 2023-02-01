import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import laptop from "../../public/laptop.png";
import { Bubble } from "../Bubble";
import { Button } from "../Button";
export const Hero = () => {
  return (
    <div className="relative flex items-center justify-between px-4 flex-col-reverse md:flex-row my-10 md:my-32">
      <div className="flex flex-col space-y-6 items-center md:items-start  max-w-lg">
        <h1
          className="title font-semibold uppercase leading-[1] text-[50px] md:text-[85px] tracking-wide
        animate-slide-from-left-600"
        >
          Automate your content
        </h1>
        <p
          className="text-[22px] leading-[30px] font-light
        animate-slide-from-left-700"
        >
          Automate your video editing and integrate
          <br /> videos with dynamic data on your site.
        </p>
        <Link href="/#contact">
          <Button
            text="Get started"
            className="text-[24px] font-normal p-3 pl-6
        animate-slide-from-left-700"
          />
        </Link>
      </div>
      <div>
        <div className="relative w-[95%] mb-10 md:mb-0">
          <Bubble width={65} top={32} left={6} />
          <Bubble width={6} top={99} left={65} />
          <Bubble width={12} top={84} left={83} />
          <Bubble width={10} top={-10} left={65} />
          <Bubble width={25} top={-8} left={80} />
          <div className="animate-slide-from-right-700">
            <video
              style={{
                transform: "perspective(1000px) rotateY(-13deg) rotateX(10deg)",
                height: "60%",
                width: "78%",
                top: "10%",
                left: "18%",
              }}
              className="absolute object-cover rounded-lg"
              src="/examples/main.mp4"
              autoPlay
              loop
              muted
            />
            <Image
              priority
              src={laptop}
              alt="laptop"
              className="relative "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
