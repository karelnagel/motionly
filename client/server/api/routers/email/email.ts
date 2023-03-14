import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";
import { env } from "../../../../env.mjs";
import { createTRPCRouter, publicProcedure } from "../../trpc";

const ContactForm = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  message: z.string().min(1),
});
export const email = createTRPCRouter({
  contact: publicProcedure
    .input(ContactForm)
    .output(z.object({}))
    .mutation(async ({ input, ctx }) => {
      const res = await axios.post("https://api.web3forms.com/submit", {
        name: input.name,
        subject: "New message for Motionly!",
        email: input.email,
        message: input.message,
        access_key: env.EMAIL_ACCESS_KEY,
      });
      if (res.status === 200 && res.data.success) return {};
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }),
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .output(z.object({}))
    .mutation(async ({ input, ctx }) => {
      const res = await axios.post("https://api.web3forms.com/submit", {
        subject: "New subscriber!",
        email: input.email,
        message: `New subscriber: ${input.email}`,
        access_key: env.EMAIL_ACCESS_KEY,
      });
      if (res.status === 200 && res.data.success) return {};
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }),
});
