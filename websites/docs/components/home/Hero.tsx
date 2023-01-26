import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col items-center w-full pt-10 pb-3 md:pt-28 space-y-8">
        <div className="relative">
          <Image
            src={"/logo.gif"}
            width={300}
            height={300}
            alt="logo"
            className="relative rounded-full"
          />
        </div>

        <div className="relative text-center max-w-[900px] space-y-10 flex flex-col items-center">
          <h1 className="title text-[50px] md:text-[70px] font-extrabold leading-[1.1]">
            Automate your content
          </h1>
          <p className=" text-[18px] md:text-[24px] leading-[1.6] font-medium text-center max-w-[600px] opacity-90">
            With Motionly you can automate your video editing and integrate
            videos with dynamic data on your site.
          </p>
        </div>
        <div className="flex space-x-5 md:space-x-10  text-xl md:text-2xl font-medium">
            <button className=" animate-pulse rounded-full p-4 px-4 text-gray-300 bg-gradient-to-r from-secondary to-primary transition transform hover:opacity-100 hover:scale-110 duration-500 "
                    onClick={e=> {
                      e.preventDefault();
                      scrollTo( {top: 890, behavior: 'smooth', })
                    }}>
              Get started
            </button>
        </div>
      </div>
    </div>
  );
};
