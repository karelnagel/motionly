import Image from "next/image";

export const AI = () => {
  return (
    <div className="flex items-center flex-col py-14 space-y-14">
      <p className="title text-5xl font-bold">Make videos using ai.</p>
      <Image src="/ai.gif" width={800} height={600} alt="ai" />
      <div className=" h-1 w-full bg-gradient-to-l from-pink-500 to-blue-600 rounded-lg" />
    </div>
  );
};
