import { Divider } from "../components/Divider";
import { Help } from "../components/home/Help";
import { Hero } from "../components/home/Hero";
import { Examples } from "../components/home/Examples";
import { Montserrat } from "@next/font/google";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import { Mission } from "../components/home/Mission";
import { Interactive } from "../components/home/Interactive";
import { FAQ } from "../components/home/FAQ";

const montserrat = Montserrat({ subsets: ["latin"] });

export const Home = () => {
  return (
    <div className="bg-base-100 text-base-content w-full">
      <Head>
        <link rel="icon" type="image/x-icon" href="/logo.png"></link>
        <meta property="og:url" content={`https://motionly.video/`} />
        <meta property="og:title" content={"Motionly"} />
        <meta property="og:description" content={"Automate your content"} />
        <title>Motionly</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta property="og:image" content={"/logowbg.png"} />
      </Head>
      <Navbar />
      <div className="max-w-[1200px] px-2 mx-auto" style={montserrat.style}>
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
        <Footer />
      </div>
    </div>
  );
};
export default Home;
