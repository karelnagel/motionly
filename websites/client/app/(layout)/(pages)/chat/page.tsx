"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const GPTResponse = z.object({
  role: z.enum(["assistant", "user", "init"]),
  id: z.string(),
  parentMessageId: z.string(),
  conversationId: z.string(),
  text: z.string(),
});
type GPTResponse = z.infer<typeof GPTResponse>;

type MessageStore = {
  messages: Partial<GPTResponse>[];
  addMessage: (message: Partial<GPTResponse>) => void;
  set: (
    partial:
      | MessageStore
      | Partial<MessageStore>
      | ((state: MessageStore) => MessageStore | Partial<MessageStore>),
    replace?: boolean | undefined
  ) => void;
};
const useMessages = create(
  persist<MessageStore>(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      set,
    }),
    { name: "messages" }
  )
);
const parseResult = (result: string) => {
  try {
    const res = result.split("\n\n\n").pop();
    const safe = GPTResponse.safeParse(JSON.parse(`${res}`));
    if (safe.success) return safe.data;
  } catch (e) {
    console.log(e);
  }
};
export default function Chat({ searchParams: {} }: { searchParams: {} }) {
  const [input, setInput] = useState("");
  const { messages, set, addMessage } = useMessages();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const init = async () => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        start: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    if (!data) return;
    addMessage(data);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!input || loading) return;
    setLoading(true);
    const prompt = input;
    setInput("");
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;
    addMessage({ text: input, role: "user" });
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        parentMessageId: lastMessage?.id,
        conversationId: lastMessage?.conversationId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    addMessage({ text: "", role: "assistant" });
    if (!response.ok) return;

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunkValue = decoder.decode(value);
      if (!chunkValue) continue;
      const res = parseResult(chunkValue);
      if (res)
        set((s) => {
          const messages = s.messages.slice(0, -1);
          return { messages: [...messages, res] };
        });
    }
    setLoading(false);
  };
  if (!messages.length)
    return (
      <button className="btn" onClick={() => init()}>
        Init
      </button>
    );
  return (
    <div className="max-w-screen-sm m-auto w-full h-full flex flex-col justify-between space-y-2">
      <div>
        {messages
          .filter((x) => x.role !== "init")
          .map((message, i) => {
            const isUser = message.role === "user";
            const image = isUser ? session?.user.image : "/logo.png";
            const name = isUser ? session?.user.name || "You" : "Motionly bot";
            return (
              <div
                key={i}
                className={`chat ${!isUser ? "chat-start" : "chat-end"}`}
              >
                {image && (
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={image} />
                    </div>
                  </div>
                )}
                <div className="chat-header opacity-80 text-xs">{name}</div>
                <div
                  className={`chat-bubble ${
                    !isUser ? "" : "chat-bubble-primary"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
      </div>

      <form onSubmit={submit} className="flex space-x-2">
        <button
          className="btn btn-error"
          type="button"
          onClick={() => set({ messages: [] })}
        >
          Clear
        </button>
        <input
          type="text"
          className="input input-primary w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
