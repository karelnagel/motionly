"use client";

import { useState } from "react";
import { trpc } from "../../app/ClientProvider";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const { mutate, isLoading, isSuccess } = trpc.email.subscribe.useMutation();
  return (
    <form
      className="col-span-2 space-y-2 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ email });
      }}
    >
      <h1 className="text-list-title text-[18px] font-semibold">
        Subscribe to updates
      </h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="formbox input input-primary"
        type="email"
        placeholder="Enter your email"
      />
      {!isSuccess ? (
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Subscribe
        </button>
      ) : (
        <p className="btn btn-success cursor-default">Subscribed!</p>
      )}
    </form>
  );
};
