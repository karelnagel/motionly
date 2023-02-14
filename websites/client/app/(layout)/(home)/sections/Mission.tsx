import phone from "../../../../public/phone.png";
import Image from "next/image";
import { Bubble } from "../../../../components/Bubble";
import { Arrows } from "../../../../components/Arrows";

export const Mission = () => {
  return (
    <div className="flex justify-between items-center  flex-col-reverse md:flex-row">
      <div className="relative w-[60%] md:w-auto">
        <Bubble width={99} top={28} left={-8} />
        <Bubble width={20} top={19} left={-10} />
        <Bubble width={35} top={4} left={65} />
        <div
          className="absolute h-full w-full"
          style={{
            transform:
              "perspective(1000px) rotateY(20deg) rotateX(8deg) rotateZ(-11.5deg)",
            top: "4.6%",
            left: "24%",
          }}
        >
          <video
            src="/examples/phone.mp4"
            className=" object-cover rounded-[8%]"
            style={{
              height: `80.4%`,
              width: "64.1%",
            }}
            autoPlay
            muted
            loop
          />
        </div>

        <Image src={phone} priority alt="phone" className="relative" />
      </div>
      <div className="max-w-xl flex flex-col space-y-8 md:text-right md:items-end">
        <h2 className="font-semibold text-[50px] md:text-[85px] leading-none title">
          Your goals our services
        </h2>
        <p className="font-light text-[22px] md:text-[30px] leading-none">
          Our mission is to transform how businesses of all sizes communicate
          their message through dynamic, data-driven videos that can be easily
          modified to fit any marketing strategy or campaign and much more.
        </p>
        <div className="mt-6 mr-6">
          <Arrows direction="left" />
        </div>
      </div>
    </div>
  );
};
