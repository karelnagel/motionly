import { data } from 'autoprefixer';
import React, { FormEventHandler, useState } from 'react';
import emailjs from 'emailjs-com';
import { ReactDOM } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Help = () => {

  const SERVICE_ID = "**************";
  const TEMPLATE_ID = "*******";
  const USER_ID = "****************";

  const errors = {
    name: "Name is required",
    email: "Email is required",
    message: "Message is required"
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [formState, setFormState] = useState<"loading" | "sent" | "error">();

  const onSubmit = (e: any) => {
    e.preventDefault();
    setFormState("loading");
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        setFormState("sent")
      }, (error) => {
        console.log(error.text);
        setFormState("error")
      });
    e.target.reset()

    console.log(name, email, message)


  };

  return (
    <div id="Contact" className="flex justify-between m-auto  max-w-screen-xl px-6">
      <div className='pb-4 max-w-3xl space-y-8 md:space-y-14'>
      <div className=" p-6 w-96 rounded-lg bg-gray-500 bg-opacity-10">
          <form className="text-center" onSubmit={onSubmit}>
            <div className="mb-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className="border border-gray-400 border-opacity-30 p-2 rounded-lg w-full bg-gray-500 bg-opacity-10 
              transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              hover:bg-opacity-30"

              />
              {/*
            {errors?.name && (
              <p className="text-error text-xs">Name is required</p>
            )}
            */}
            </div>
            <div className="mb-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className="border border-gray-400 border-opacity-30 p-2 rounded-lg w-full bg-gray-500 bg-opacity-10 
              transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              hover:bg-opacity-30"

              />
              {/*
            {errors?.email && (
              <p className="text-error text-xs">Email is required</p>
            )}
            */}
            </div>
            <div className="mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message'
                className="border border-gray-400 border-opacity-30 p-2 rounded-lg w-full bg-gray-500 bg-opacity-10 
              transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              hover:bg-opacity-30"
                rows={5}
              //ref={register({ required: true })}
              />
              {/*
            {errors?.message && (
              //<p className="text-red-500 text-xs">Message is required</p>
              <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-" role="alert">
                <span className="block sm:inline">{errors.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
              </div>
            )}
            */}
            </div>
            <button className="btn rounded-3xl p-3 pl-5 text-sm opacity-70 !bg-gradient-to-r !to-purple-400 !from-pink-600 !bg-gray-700 hover:!bg-gradient-to-r hover:!to-purple-400 hover:!from-pink-600 transform transition hover:opacity-100 hover:scale-110 duration-300"
              type="submit"
            >Send <IoIosArrowForward className="pb-0 text-lg"/></button>
          </form>
          {formState === "sent"
            && <p className="text-success text-xs mt-2">Form submitted successfully!</p>}
          {formState === "loading"
            && <p className="text-amber-500 text-xs mt-2">Sending</p>}
          {formState === "error"
            && <p className="text-error text-xs mt-2">Form sending failed!</p>}
        </div>
      </div>
      <div className=" text-right max-w-lg">
        <div className="pb-2 display block space-y-8 md:space-y-1">
          <p className="text-4xl mb-8 md:text-[50px] font-semibold leading-[1.1] text-right text-transparent bg-clip-text bg-gradient-to-bl to-purple-400 from-pink-600">Contact us</p>
          <p className="text-3xl pb-3">Feel free to contact us with any questions or feedback</p>
          <p className="text-3xl pb-2 ">We will get back to you ASAP</p>
          <a className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 transform transition hover:scale-110 duration-200" href="mailto:info@motionly.video" >info@motionly.video</a>
        </div>

      </div>
    </div>
  );
}

// Path: websites\docs\components\home\Help.tsx

