import {
  AllAnimations,
  AnimationTypes,
  GraphTypes,
  MockupTypes,
  ObjectFit,
  ProgressbarTypes,
  SelectTypes,
  ShapeTypes,
  TranscriptionAnimationTypes,
  TransformProps,
  TriangleDirection,
} from "@motionly/base";
import { getAvailableFonts } from "@remotion/google-fonts";
import { InputProps } from "..";

export const SelectOptions: { [key in SelectTypes]: { [k: string]: string } } =
  {
    justify: {
      start: "Start",
      center: "Center",
      end: "End",
    },
    align: {
      left: "Left",
      center: "Center",
      right: "Right",
    },
    "font-family": Object.fromEntries(
      getAvailableFonts().map((f) => [f.fontFamily, f.fontFamily])
    ),
    "animation-props": Object.fromEntries(
      AllAnimations.options.map((o) => [o, o])
    ),
    "animation-types": Object.fromEntries(
      AnimationTypes.options.map((o) => [o, o])
    ),
    "object-fit": Object.fromEntries(ObjectFit.options.map((o) => [o, o])),
    "graph-types": Object.fromEntries(GraphTypes.options.map((o) => [o, o])),
    "mockup-types": Object.fromEntries(MockupTypes.options.map((o) => [o, o])),
    "progressbar-types": Object.fromEntries(
      ProgressbarTypes.options.map((o) => [o, o])
    ),
    "triangle-direction": Object.fromEntries(
      TriangleDirection.options.map((o) => [o, o])
    ),
    "shape-types": Object.fromEntries(ShapeTypes.options.map((o) => [o, o])),
    "transcription-types": Object.fromEntries(
      TranscriptionAnimationTypes.options.map((o) => [o, o])
    ),
    "font-weight": {
      100: "Thin",
      200: "Extra Light",
      300: "Light",
      400: "Regular",
      500: "Medium",
      600: "Semi Bold",
      700: "Bold",
      800: "Extra Bold",
      900: "Black",
    },
    "transform-props": Object.fromEntries(
      TransformProps.options.map((o) => [o, o])
    ),
  };

export type SelectOptions = keyof typeof SelectOptions;
export const SelectInput = ({
  type,
  disabled,
  value,
  onChange,
}: InputProps<string | number>) => {
  return (
    <select
      disabled={disabled}
      className="select select-bordered select-sm bg-base-200 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={undefined}>Not selected</option>
      {Object.entries(SelectOptions[type as SelectTypes]).map(
        ([value, label], i) => (
          <option key={i} value={value}>
            {label[0].toUpperCase() + label.slice(1)}
          </option>
        )
      )}
    </select>
  );
};
