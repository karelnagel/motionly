import Image from "next/image";
import { getRandomImage } from "../helpers";

export const Title = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center h-[250px] w-full relative">
      <Image
        src={getRandomImage()}
        fill={true}
        className="object-cover rounded-2xl"
        alt="bg"
      />
      <p className="relative text-primary-content text-5xl font-bold p-5 gradient bg-opacity-80 rounded-lg">
        {text}
      </p>
    </div>
  );
};
