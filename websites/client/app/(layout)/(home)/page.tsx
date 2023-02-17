import { Divider } from "../../../components/Divider";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Examples } from "./sections/Examples";
import { Mission } from "./sections/Mission";
import { Interactive } from "./sections/Interactive";
import { FAQ } from "./sections/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col text-center md:text-left px-2 md:px-0 ">
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
  );
}
