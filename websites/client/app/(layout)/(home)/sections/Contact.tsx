import React, { useState } from "react";
import { Bubble } from "../../../../components/Bubble";
import { trpc } from "../../../ClientProvider";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isSuccess, isError, isLoading } =
    trpc.email.contact.useMutation();
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
              onSubmit={(e) => {
                e.preventDefault();
                mutate({ email, name, message });
              }}
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
            <div className="h-6 mt-2">
              {isSuccess && <p>Message sent!</p>}
              {isLoading && <p className="text-info">Sending...</p>}
              {isError && <p className="text-error">Message sending failed!</p>}
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
