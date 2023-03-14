"use client";

import { useState } from "react";
import { trpc } from "../../../../../ClientProvider";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isSuccess, isError, isLoading } =
    trpc.email.contact.useMutation();
  return (
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
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        Submit
      </button>
      <div className="h-6 mt-2">
        {isSuccess && <p className="text-success">Message sent!</p>}
        {isLoading && <p className="text-info">Sending...</p>}
        {isError && <p className="text-error">Message sending failed!</p>}
      </div>
    </form>
  );
};
