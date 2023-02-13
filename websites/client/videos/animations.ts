import { AnimationProps, ComponentProps } from "@motionly/base";

type AnimationSection = {
  name: string;
  animations: OneAnimation[];
};
type OneAnimation = {
  name: string;
  animations: AnimationProps[];
};
const id = "";
const start = -1;

const fadeIn: AnimationProps = {
  id,
  type: "spring",
  from: 0,
  to: 1,
  prop: "opacity",
};
const fadeOut: AnimationProps = {
  id,
  type: "spring",
  from: 1,
  to: 0,
  start,
  prop: "opacity",
};

export const allAnimations = (comp: ComponentProps): AnimationSection[] => {
  const width = comp.width || 100;
  const height = comp.height || 100;
  const x = comp.x || 0;
  const y = comp.y || 0;
  return [
    {
      name: "Entrance",
      animations: [
        {
          name: "Scale In",
          animations: [
            {
              id,
              type: "spring",
              from: 0,
              to: 1,
              prop: "scale",
            },
          ],
        },
        {
          name: "Scale Out",
          animations: [
            fadeIn,
            {
              id,
              type: "spring",
              from: 10,
              to: 1,
              prop: "scale",
            },
          ],
        },
        {
          name: "Fade",
          animations: [fadeIn],
        },
        {
          name: "Up",
          animations: [
            fadeIn,
            {
              id,
              type: "spring",
              from: -2 * height,
              to: 0,
              prop: "translateY",
            },
          ],
        },
        {
          name: "Down",
          animations: [
            fadeIn,
            {
              id,
              type: "spring",
              from: 2 * height,
              to: 0,
              prop: "translateY",
            },
          ],
        },
        {
          name: "Left",
          animations: [
            fadeIn,
            {
              id,
              type: "spring",
              from: -2 * width,
              to: 0,
              prop: "translateX",
            },
          ],
        },
        {
          name: "Right",
          animations: [
            fadeIn,
            {
              id,
              type: "spring",
              from: 2 * width,
              to: 0,
              prop: "translateX",
            },
          ],
        },
        {
          name: "Radius",
          animations: [
            {
              id,
              type: "spring",
              from: 0,
              to: 1,
              prop: "scale",
            },
            {
              id,
              type: "spring",
              from: Math.max(width, height) / 2,
              to: 0,
              prop: "borderRadius",
            },
          ],
        },
      ],
    },
    {
      name: "Continuous",
      animations: [
        {
          name: "Up",
          animations: [
            {
              id,
              type: "interpolate",
              from: height,
              to: -height,
              prop: "translateY",
            },
          ],
        },
        {
          name: "Down",
          animations: [
            {
              id,
              type: "interpolate",
              from: -height,
              to: height,
              prop: "translateY",
            },
          ],
        },
        {
          name: "Left",
          animations: [
            {
              id,
              type: "interpolate",
              from: width,
              to: -width,
              prop: "translateX",
            },
          ],
        },
        {
          name: "Right",
          animations: [
            {
              id,
              type: "interpolate",
              from: -width,
              to: width,
              prop: "translateX",
            },
          ],
        },
        {
          name: "Rotate",
          animations: [
            {
              id,
              type: "interpolate",
              from: 0,
              to: 720,
              prop: "rotate",
            },
          ],
        },
        {
          name: "Spin Y",
          animations: [
            {
              id,
              type: "interpolate",
              from: 0,
              to: 1080,
              prop: "rotateY",
            },
          ],
        },
        {
          name: "Spin X",
          animations: [
            {
              id,
              type: "interpolate",
              from: 0,
              to: 1080,
              prop: "rotateX",
            },
          ],
        },
      ],
    },
    {
      name: "Random",
      animations: [
        {
          name: "Horizontal",
          animations: [
            {
              id,
              type: "noise",
              from: -width,
              to: width,
              prop: "translateX",
              speed: 5,
            },
          ],
        },
        {
          name: "Vertical",
          animations: [
            {
              id,
              type: "noise",
              from: -height,
              to: height - 1,
              prop: "translateY",
              speed: 5,
            },
          ],
        },
        {
          name: "Scale",
          animations: [
            {
              id,
              type: "noise",
              from: 0,
              to: 1,
              prop: "scale",
              speed: 5,
            },
          ],
        },
        {
          name: "3D",
          animations: [
            {
              id,
              type: "noise",
              from: -width,
              to: width,
              prop: "translateX",
              speed: 5,
            },
            {
              id,
              type: "noise",
              from: -height,
              to: height + 1,
              prop: "translateY",
              speed: 5,
            },
            {
              id,
              type: "noise",
              from: 0,
              to: 1,
              prop: "scale",
              speed: 5,
            },
          ],
        },
      ],
    },
    {
      name: "Endings",
      animations: [
        {
          name: "Scale In",
          animations: [
            {
              id,
              type: "spring",
              from: 1,
              to: 0,
              prop: "scale",
              start,
            },
          ],
        },
        {
          name: "Scale Out",
          animations: [
            fadeOut,
            {
              id,
              type: "spring",
              from: 1,
              to: 10,
              prop: "scale",
              start,
            },
          ],
        },
        {
          name: "Fade",
          animations: [fadeOut],
        },
        {
          name: "Up",
          animations: [
            fadeOut,
            {
              id,
              type: "spring",
              from: 0,
              to: -2 * height,
              prop: "translateY",
              start,
            },
          ],
        },
        {
          name: "Down",
          animations: [
            fadeOut,
            {
              id,
              type: "spring",
              from: 0,
              to: 2 * height,
              prop: "translateY",
              start,
            },
          ],
        },
        {
          name: "Left",
          animations: [
            fadeOut,
            {
              id,
              type: "spring",
              from: 0,
              to: -2 * width,
              prop: "translateX",
              start,
            },
          ],
        },
        {
          name: "Right",
          animations: [
            fadeOut,
            {
              id,
              type: "spring",
              from: 0,
              to: 2 * width,
              prop: "translateX",
              start,
            },
          ],
        },
      ],
    },
  ];
};
