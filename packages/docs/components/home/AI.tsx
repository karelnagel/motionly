import Image from "next/image";

export const AI = () => {
  return (
    <div className="flex items-center flex-col space-y-8 md:space-y-14">
      <p className="title text-4xl md:text-5xl font-bold text-center">
        Make videos using AI.
      </p>
      <Image src="/ai.gif" width={800} height={600} alt="ai" />
    </div>
  );
};
