import { Template } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const tags = ["AI"];
export const ai = createTRPCRouter({
  message: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/ai", tags } })
    .input(z.object({ template: Template, prompt: z.string() }))
    .output(z.object({ template: Template }))
    .mutation(async ({ input, ctx }) => {
      // const { comps, prompt } = req.body;
      // const inputComps = comps.map((comp: any) => ({
      //   ...comp,
      //   src: undefined,
      // }));
      // const inputPrompt = `${types}
      // // In one line json of ComponentProps[]
      // const json1="${JSON.stringify(inputComps)}";
      //   Modify json1 with this prompt "${prompt}"
      //   // In one line of ComponentProps[]
      //   const json2="[`;
      // console.log(inputPrompt);
      // const configuration = new Configuration({
      //   apiKey: env.OPENAI_API_KEY,
      // });
      // const openai = new OpenAIApi(configuration);
      // const response = await openai.createCompletion({
      //   model: "code-davinci-002",
      //   temperature: 0.2,
      //   max_tokens: 800,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      //   stop: [']";'],
      //   prompt: inputPrompt,
      // });
      // console.log(response.data.usage);
      // const result = response.data.choices[0].text;
      // console.log(result);
      // try {
      //   const outComps = JSON.parse(`[${result}]`);
      //   res.status(200).json(
      //     outComps.map((comp: any) => ({
      //       ...comp,
      //       src: comps.find((c: any) => c.id === comp.id && c.comp === comp.comp)
      //         ?.src,
      //       id: Math.random().toString(36).substring(6),
      //     }))
      //   );
      // } catch (e) {
      //   console.log(e);
      //   res.status(403).end();
      // }
      return { template: input.template };
    }),
});
