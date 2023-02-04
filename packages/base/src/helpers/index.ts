import { ComponentProps, Components, TemplateType } from "../types";

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

export const getFonts = (comps: Components) => {
  return JSON.stringify(comps)
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"));
};

export function applyInputs(template: TemplateType) {
  const newTemplate = JSON.parse(JSON.stringify(template)) as TemplateType;
  if (!newTemplate.inputs) return newTemplate;
  for (const inputId of newTemplate.inputs.allIds) {
    const input = newTemplate.inputs?.byIds[inputId];
    if (!input?.properties) continue;
    for (const prop of input.properties) {
      if (!prop.id || prop.id === "template") {
        (newTemplate as any)[prop.prop] = input.value;
      } else if (prop.id) {
        const comp = newTemplate.components[prop.id] as any;
        if (!comp) continue;
        const props = prop.prop.split(".");
        if (props.length === 1 && comp) {
          comp[props[0]] = input.value;
        } else if (props.length === 2 && comp?.[props[0]]) {
          comp[props[0]][props[1]] = input.value;
        } else if (props.length === 3 && comp?.[props[0]]?.[props[1]]) {
          comp[props[0]][props[1]][props[2]] = input.value;
        } else if (
          props.length === 4 &&
          comp?.[props[0]]?.[props[1]]?.[props[2]]
        ) {
          comp[props[0]][props[1]][props[2]][props[3]] = input.value;
        }
      }
    }
  }
  return newTemplate;
}
