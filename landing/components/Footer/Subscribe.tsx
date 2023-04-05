"use client";

import { useState } from "react";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <form
      className="col-span-2 space-y-2 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSuccess(true);
      }}
    >
      <h1 className="text-list-title text-[18px] font-semibold">Subscribe to updates</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-base-300 rounded-md p-2"
        type="email"
        placeholder="Enter your email"
      />
      {!isSuccess ? (
        <button className="bg-primary py-2 rounded-md" type="submit">
          Subscribe
        </button>
      ) : (
        <p className="cursor-default">It's not working yet, but thanks for trying 😀</p>
      )}
    </form>
  );
};
