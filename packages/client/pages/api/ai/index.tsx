import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export const types = `type AllComponents={fontSize;fontFamily;fontWeight;lineHeight;textAlign?:"left"|"center"|"right";bg;color;outlineColor;outlineWidth;}|
{comp:"transcription";textStyle:TextStyle;scrollByPage;animationType:"current-word"|"previous-text";animationStyle:TextStyle;}|
{comp:"audio";volume;startFrom;}|
{comp:"audiogram";position:"center"|"start"|"end";gap;barWidth;color;roundness;startFrom;smoothing;mirror;multiplier;}|
{comp:"div";bg;}|
{comp:"gif";objectFit:"cover"|"contain"|"fill"|"none";}|
{comp:"graph";color;type:"line"|"bar"|"pie";max;min;animationStart;animationDuration;strokeWidth;gap;roundness;}|
{comp:"image";objectFit:"cover"|"contain"|"fill"|"none";}|
{comp:"lottie";backwards;loop;playbackRate;bg;}|
{comp:"map";lat;lng;zoom;fill;stroke;strokeWidth;markerColor;markerSize;url;bg;}|
{comp:"mockup";type:"iPhone"|"iPad"|"chrome"|"macbook"|"apple-watch"|"vs-code";}|
{comp:"path";path;strokeColor;strokeWidth;viewBoxX;viewBoxY;viewBoxHeight;viewBoxWidth;fillColor;isRound;}|
{comp:"qrcode";text;color;bg;}|
{comp:"text";textStyle:TextStyle;text;}|
{comp:"video";objectFit:"cover"|"contain"|"fill"|"none";startFrom;muted;volume;offthread;}|
{comp:"progressbar";type:"spotify"|"line"|"circle"|"square";color;bg;barWidth;topRight;};
type AnimationProps={type:"rotate"|"rotateX"|"rotateY"|"rotateZ"|"scale"|"scaleX"|"scaleY"|"scaleZ"|"translate"|"translateX"|"translateY"|"translateZ"|"skew"|"skewX"|"skewY"|"perspective";start;end;from;to;duration;mass;damping;stiffness;reverse;}
type BaseProps={id;height;width;x;y;borderRadius;rotation;from;duration;opacity;animations?:AnimationProps[];}
type ComponentProps=BaseProps&AllComponents;`;

export default async function Template(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { comps, prompt } = req.body;
  const inputComps = comps.map((comp: any) => ({
    ...comp,
    src: undefined,
  }));

  const inputPrompt = `${types}
  // In one line json of ComponentProps[]
  const json1="${JSON.stringify(inputComps)}";

    Modify json1 with this prompt "${prompt}"

    // In one line of ComponentProps[]
    const json2="[`;
  console.log(inputPrompt);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "code-davinci-002",
    temperature: 0.2,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [']";'],
    prompt: inputPrompt,
  });
  console.log(response.data.usage);
  const result = response.data.choices[0].text;
  console.log(result);
  try {
    const outComps = JSON.parse(`[${result}]`);
    res.status(200).json(
      outComps.map((comp: any) => ({
        ...comp,
        src: comps.find((c: any) => c.id === comp.id && c.comp === comp.comp)
          ?.src,
        id: Math.random().toString(36).substring(6),
      }))
    );
  } catch (e) {
    console.log(e);
    res.status(403).end();
  }
}
