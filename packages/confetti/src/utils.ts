import { random } from "remotion";
import type { IConfettiOptions } from "./interfaces";

const confettiDefaults: IConfettiOptions = {
  particleCount: 50,
  angle: 90,
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  x: 0.5,
  y: 0.5,
  shapes: ["square", "circle"],
  colors: [
    "#26ccff",
    "#a25afd",
    "#ff5e7e",
    "#88ff5a",
    "#fcff42",
    "#ffa62d",
    "#ff36ff",
  ],
  scalar: 1,
  width: 1280,
  height: 720,
};

export const convert = (
  val: string | number,
  transform: ((value: any) => any) | undefined
) => {
  return transform ? transform(val) : val;
};

export const isOk = (val: string | number): boolean => {
  return !(val === null || val === undefined);
};

export const prop = (
  options: { [index: string]: any },
  name: keyof IConfettiOptions,
  transform?: (value: any) => any
) => {
  return convert(
    options && isOk(options[name]) ? options[name] : confettiDefaults[name],
    transform
  );
};

export const onlyPositiveInt = (number: number): number => {
  return number < 0 ? 0 : Math.floor(number);
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(random("int") * (max - min)) + min;
};

export const toDecimal = (str: string) => {
  return parseInt(str, 16);
};

export const colorsToRgb = (colors: string[]) => {
  return colors.map(hexToRgb);
};

export const hexToRgb = (str: string) => {
  let val = String(str).replace(/[^0-9a-f]/gi, "");

  if (val.length < 6) {
    val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
  }

  return {
    r: toDecimal(val.substring(0, 2)),
    g: toDecimal(val.substring(2, 4)),
    b: toDecimal(val.substring(4, 6)),
  };
};
