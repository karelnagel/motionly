import React from "react";
import { Bubble } from "../../../../../components/Bubble";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <div className="relative ">
      <div
        id="contact"
        className="relative flex flex-col-reverse px-4 py-8 md:flex-row z-20 "
      >
        <div className=" pb-4 pt-12 max-w-xl w-full">
          <ContactForm />
        </div>
        <div className="md:ml-8 max-w-lg ">
          <div className="pb-2 space-y-6 md:space-y-6">
            <p className="title text-[50px] md:text-[85px] mb-8 font-semibold leading-[1.1]  ">
              Contact us
            </p>
            <p className="text-[25px] font-medium pb-3">
              Want to create stunning videos without spending hours on editing?
              Contact us today and let us show you how Motionly can automate
              your video production and make your business stand out.
            </p>
          </div>
        </div>
      </div>
      <Bubble width={9} top={45} left={85} />
      <Bubble width={3} top={35} left={95} />
    </div>
  );
};
