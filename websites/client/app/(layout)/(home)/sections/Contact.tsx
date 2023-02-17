import React, { useState } from "react";
import { Bubble } from "../../../../components/Bubble";
import axios from "axios";
import { env } from "../../../../env.mjs";

export const Contact = () => {
  const [formState, setFormState] = useState<
    "" | "loading" | "sent" | "error"
  >();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setFormState("loading");

    if (!email || !name || !message) {
      setFormState("error");
      return;
    }

    try {
      const res = await axios.post("https://api.web3forms.com/submit", {
        name,
        subject: "New message for Motionly",
        email,
        message,
        access_key: env.NEXT_PUBLIC_EMAIL_ACCESS_KEY,
      });
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
            <form
              className="flex flex-col items-center space-y-6 "
              onSubmit={onSubmit}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
                className="formbox input input-primary"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="formbox input input-primary"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Message"
                className="formbox textarea textarea-primary"
                rows={5}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="h-6 mt-2">
              {formState === "sent" && (
                <p className="title text-base font-semibold text-center ">
                  Message sent!
                </p>
              )}
              {formState === "loading" && (
                <p className="text-info text-base font-normal  text-center ">
                  Sending...
                </p>
              )}
              {formState === "error" && (
                <p className="text-error text-base font-normal text-center ">
                  Message sending failed!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="md:ml-8  max-w-lg ">
          <div className="pb-2  space-y-6 md:space-y-6">
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
