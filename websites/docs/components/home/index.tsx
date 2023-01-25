import { Divider } from "../Divider";
import { Help } from "./Help";
import { Hero } from "./Hero";
import { Examples } from "./Example";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Home = () => {
  return (
    <div style={inter.style}>
      <Hero />
      <Divider />
      <Examples />
      <Divider />
      <Help />
      <Divider />
    </div>
  );
};
