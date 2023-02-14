"use client";
import { Divider } from "../../../components/Divider";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Examples } from "./sections/Examples";
import Head from "next/head";
import { Mission } from "./sections/Mission";
import { Interactive } from "./sections/Interactive";
import { FAQ } from "./sections/FAQ";

export default function Home() {
  return (
    <div>
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
      <div className=" flex flex-col px-2 text-center md:text-left ">
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
        <Contact />
        <div className="-mb-14">
          <Divider />
        </div>
      </div>
    </div>
  );
}
