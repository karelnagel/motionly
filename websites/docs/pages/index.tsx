import { Divider } from "../components/Divider";
import { Help } from "../components/home/Help";
import { Hero } from "../components/home/Hero";
import { Examples } from "../components/home/Example";
import { Inter } from "@next/font/google";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const Home = () => {
  return (
    <div className="" style={inter.style}>
      <Head  ><link rel="icon" type="image/x-icon" href="/logo.png"></link>
        <meta property="og:url" content={`https://motionly.video/`} />
        <meta property="og:title" content={"Motionly"} />
        <meta
          property="og:description"
          content={ "Automate your content"}
        />
        <title>Motionly</title>
        <meta
          property="og:image"
          content={"/logowbg.png"}
        /></Head>
      <Navbar />
      <Hero />
      <Examples />
      <Divider />
      <Help />
      <Footer />
    </div>
  );
};
export default Home;
