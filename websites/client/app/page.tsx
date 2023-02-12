"use client";
import { Divider } from "../components/docs/Divider";
import { Help } from "../components/docs/home/Help";
import { Hero } from "../components/docs/home/Hero";
import { Examples } from "../components/docs/home/Examples";
import { Footer } from "../components/docs/Footer";
import { Navbar } from "../components/docs/Navbar";
import Head from "next/head";
import { Mission } from "../components/docs/home/Mission";
import { Interactive } from "../components/docs/home/Interactive";
import { FAQ } from "../components/docs/home/FAQ";

export default function Home() {
  return (
    <div
      className={`font-montserrat bg-base-100 text-base-content w-full overflow-hidden`}
    >
      <Head>
        <link rel="icon" type="image/x-icon" href="/logo.png"></link>
        <meta property="og:url" content={`https://motionly.video/`} />
        <meta property="og:title" content={"Motionly"} />
        <meta property="og:description" content={"Automate your content"} />
        <meta property="og:image" content="https://motionly.video/api/og" />
        <title>Motionly</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:image" content={"/logowbg.png"} />
      </Head>
      <Navbar />
      <div className=" flex flex-col max-w-[1200px] px-2 mx-auto text-center md:text-left ">
        <Hero />
        <Divider />
        <Mission />
        <Divider />
        <Interactive />
        <Divider />
        <Examples />
        <Divider />
        <FAQ />
        <Divider />
        <Help />
        <div className="-mb-14">
          <Divider />
        </div>
        <Footer />
      </div>
    </div>
  );
}
