import React, { useState } from "react";
import { Button } from "../Button";
import { Bubble } from "../Bubble";
import axios from "axios";

export const Help = () => {

  const [formState, setFormState] = useState<"" | "loading" | "sent" | "error">();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormState("loading");

    if (!email || !name || !message) {
      setFormState("error");
      return;
    }

    try {
      const res = await axios.post("https://api.web3forms.com/submit", { name, subject: "New message for Motionly", email, message, access_key: process.env.NEXT_PUBLIC_EMAIL_ACCESS_KEY }
      );
      console.log(res);
      if (res.status === 200 && res.data.success) {
        setFormState("sent");
        console.log("Success", res);
        setTimeout(() => {
          setFormState("");
        }, 3000);
      } else {
        setFormState("error");
        console.log("Error", res);
        setTimeout(() => {
          setFormState("");
        }, 10000);
      }
    } catch (error) {
      setFormState("error");
      console.log("Error", error);
      setTimeout(() => {
        setFormState("");
      }, 10000);
    }
  };
  return (
    <div className="relative ">
      <div
        id="contact"
        className="relative flex flex-col-reverse px-4 py-8 md:flex-row z-20 "
      >
        <div className=" pb-4 pt-12 max-w-xl w-full">
          <div className=" p-6">
            <form className="flex flex-col items-center space-y-6 " onSubmit={onSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
                className="formbox w-full"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="formbox w-full"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Message"
                className="formbox w-full h-[270px]"
                rows={5}
              />
              <Button submit text="Submit" className="p-3 pl-6 bg-opacity-60 bg-accent hover:bg-opacity-70" />
            </form>
            <div className="h-6 mt-2">
            {formState === "sent" && (
              <p className="title text-base font-semibold text-center ">
                Message sent!
              </p>
            )}
            {formState === "loading" && (
              <p className="text-info text-base font-normal  text-center ">Sending...</p>
            )}
            {formState === "error" && (
              <p className="text-error text-base font-normal text-center ">Message sending failed!</p>
            )}
            </div>
          </div>
        </div>
        <div className="md:ml-8  max-w-lg ">
          <div className="pb-2  space-y-6 md:space-y-6">
            <p className="title text-[50px] md:text-[85px] mb-8 font-semibold leading-[1.1]  ">
              Contact us
            </p>
            <p className="text-[32px] font-bold pb-3">
              Let's explore how Motionly can work for YOU!
            </p>
            <p className="text-[25px] font-medium pb-3">
              Feel free to contact us with any questions or feedback
            </p>
            <p className="text-[25px] font-medium pb-2 ">We will get back to you ASAP</p>
            <a
              className="text-accent text-[25px] font-bold"
              href="mailto:info@motionly.video"
            >
              info@motionly.video
            </a>
          </div>
        </div>
      </div>
      <Bubble width={25} top={80} left={85} />
      <Bubble width={9} top={65} left={85} />
    </div>
  );
};