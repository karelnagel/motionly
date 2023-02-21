import {
  CompVariable,
  ComponentProps,
  Components,
  Variable,
  TemplateType,
} from "../types";

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

export const getFonts = (comps?: ComponentProps[]) => {
  return JSON.stringify(comps)
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"));
};

export const toTree = (
  components: Components,
  childIds: string[],
  variables: { [key: string]: Variable }
): ComponentProps[] => {
  const tree = childIds.map((id) => {
    let comp = components[id];
    comp = applyVariables(comp, variables, comp?.compVariables);
    if ("childIds" in comp) {
      comp.comps = [
        ...(comp.comps || []),
        ...toTree(components, comp.childIds, variables),
      ];
    }
    return comp;
  });
  return tree;
};

export function applyVariables<T>(
  comp: T,
  inputs: { [key: string]: Variable },
  compVariables?: CompVariable[]
): T {
  const newComp = JSON.parse(JSON.stringify(comp || {}));
  for (const variable of compVariables || []) {
    const variableVal = inputs[variable.id]?.value;
    if (variableVal === undefined) continue;

    const props = variable.prop.split(".");
    let currentProp = newComp;
    for (let i = 0; i < props.length - 1; i++) {
      currentProp = currentProp[props[i]];
    }
    currentProp[props[props.length - 1]] = variableVal;
  }
  return newComp;
}

export const prepareTemplate = (template: TemplateType) => {
  const newTemplate = applyVariables(
    template,
    template.variables?.byIds || {},
    template.templateVariables
  );
  newTemplate.comps = toTree(
    newTemplate.components,
    newTemplate.childIds,
    newTemplate.variables?.byIds || {}
  );
  return newTemplate;
};
