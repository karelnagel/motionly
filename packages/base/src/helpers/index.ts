import { ComponentProps, TemplateType } from "../types";

export const videoUrl =
  "https://remotionlambda-24lixyhuqn.s3.us-east-1.amazonaws.com/video.mp4";

// if from is negative, it's relative to the end of the video
export const getFrom = (maxDuration: number, from?: number) => {
  if (!from) return 0;
  if (Math.abs(from) >= maxDuration) return 0;
  return from > 0 ? from : maxDuration + from;
};

export const getDuration = (
  maxDuration: number,
  from?: number,
  duration?: number,
  addFrom?: boolean
) => {
  const actualFrom = getFrom(maxDuration, from);
  let actualDuration = 0;
  if (!duration) actualDuration = maxDuration - actualFrom;
  else if (duration > 0) actualDuration = duration;
  else if (duration < 0) actualDuration = maxDuration - actualFrom + duration;
  if (
    !actualDuration ||
    actualDuration <= 0 ||
    actualDuration > maxDuration - actualFrom
  )
    actualDuration = maxDuration - actualFrom || 1;
  return addFrom ? actualDuration + actualFrom : actualDuration;
};

export const getFonts = (comps: ComponentProps[]) => {
  return JSON.stringify(comps)
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"));
};

export function applyInputs<T extends TemplateType>(template: T) {
  const newTemplate = { ...template };
  if (!newTemplate.inputs) return newTemplate;
  for (const input of newTemplate.inputs) {
    if (!input.properties) continue;
    for (const prop of input.properties) {
      if (!prop.id || prop.id === "template") {
        (newTemplate as any)[prop.prop] = input.value;
      } else if (prop.id) {
        const recursive = (comps: ComponentProps[]) => {
          for (const comp of comps) {
            if (comp.id === prop.id) {
              (comp as any)[prop.prop] = input.value;
            } else if ("comps" in comp && comp.comps.length > 0) {
              recursive(comp.comps);
            }
          }
        };
        recursive(newTemplate.comps);
      }
    }
  }
  return newTemplate;
}
