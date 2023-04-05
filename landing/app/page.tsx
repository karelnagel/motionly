import Link from "next/link";
import Image from "next/image";
import { Download } from "~/components/Download";
import { github } from "~/config";

const Hero = () => {
  return (
    <div className=" grid grid-cols-2 items-center h-screen">
      <div className="flex flex-col space-y-4">
        <h1 className="uppercase text-7xl font-bold">Automate your content</h1>
        <p className="text-xl">Automate your video editing and integrate videos with dynamic data on your site.</p>
        <div className=" flex items-center space-x-3">
          <Download />
          <Link href={github} className="border border-base-content font-bold text-lg rounded-md cursor-pointer py-2 text-center w-40">
            GitHub
          </Link>
        </div>
      </div>
      <div>{/* <Image priority src="/favicon.png" alt="video" height={400} width={600} className="" /> */}</div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto">
      <Hero />
    </main>
  );
}
