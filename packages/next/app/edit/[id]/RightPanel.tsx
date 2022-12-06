"use client";

import { ColorInput, NumberInput, SelectInput, TextInput } from "../../../components/inputs";
import { FONTS } from "../../../config";
import {
  CompProps,
  DivCompProps,
  ImageCompProps,
  ObjectFit,
  SizeProps,
  TextAlign,
  TextCompProps,
  TextStyle,
} from "../../../types";

export const RightPanel = ({
  props,
  setProps,
  size,
  setSize,
}: {
  props?: CompProps;
  setProps?: (element: CompProps) => void;
  size: SizeProps;
  setSize: (size: SizeProps) => void;
}) => {
  return (
    <div className="bg-base-100 border-t h-full w-full">
      {props && setProps && <ElementEditor props={props} setProps={setProps} />}
      {!props && <TemplateEditor size={size} setSize={setSize} />}
    </div>
  );
};

export const TemplateEditor = ({
  size,
  setSize,
}: {
  size: SizeProps;
  setSize: (template: SizeProps) => void;
}) => {
  return (
    <div className="w-full grid grid-cols-2 items-center justify-items-start gap-3 py-10 px-4">
      <p className="text-xl font-bold col-span-2">Template</p>
      <NumberInput label="W" value={size.width} onChange={(width) => setSize({ ...size, width })} />
      <NumberInput
        label="H"
        value={size.height}
        onChange={(height) => setSize({ ...size, height })}
      />
    </div>
  );
};

export const ElementEditor = ({
  props,
  setProps,
}: {
  props?: CompProps;
  setProps: (element: CompProps) => void;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 items-center justify-items-start gap-3  py-10 px-4">
      {props && (
        <>
          <NumberInput label="X" value={props.x} onChange={(x) => setProps({ ...props, x })} />
          <NumberInput label="Y" value={props.y} onChange={(y) => setProps({ ...props, y })} />
          <NumberInput
            label="W"
            value={props.width}
            onChange={(width) => setProps({ ...props, width })}
          />
          <NumberInput
            label="H"
            value={props.height}
            onChange={(height) => setProps({ ...props, height })}
          />
          <NumberInput
            label="RAD"
            value={props.borderRadius}
            onChange={(borderRadius) => setProps({ ...props, borderRadius })}
          />
          <NumberInput
            label="ROT"
            value={props.rotation}
            onChange={(rotation) => setProps({ ...props, rotation })}
          />
          <NumberInput
            label="FROM"
            value={props.from}
            onChange={(from) => setProps({ ...props, from })}
          />
          <NumberInput
            label="DUR"
            value={props.duration}
            onChange={(duration) => setProps({ ...props, duration })}
          />
          {props.type === "text" && <TextEditor props={props} setProps={setProps} />}
          {props.type === "image" && <ImageEditor props={props} setProps={setProps} />}
          {props.type === "div" && <DivEditor props={props} setProps={setProps} />}
        </>
      )}
    </div>
  );
};

export const TextEditor = ({
  props,
  setProps,
}: {
  props: TextCompProps;
  setProps: (element: TextCompProps) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Text details</p>
      <TextInput
        label="Text"
        value={props.text}
        onChange={(text) => setProps({ ...props, text })}
      />
      <TextStyleEditor
        props={props.textStyle}
        setProps={(textStyle) => setProps({ ...props, textStyle })}
      />
    </>
  );
};

export const TextStyleEditor = ({
  props,
  setProps,
}: {
  props: TextStyle;
  setProps: (props: TextStyle) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Text style</p>
      <ColorInput
        label="Color"
        value={props.color || ""}
        onChange={(color) => setProps({ ...props, color })}
      />
      <ColorInput
        label="Back"
        value={props.backgroundColor}
        onChange={(backgroundColor) => setProps({ ...props, backgroundColor })}
      />
      <NumberInput
        label="Size"
        className="col-span-2"
        value={props.fontSize}
        onChange={(fontSize) => setProps({ ...props, fontSize })}
      />
      <SelectInput
        label="Family"
        value={props.fontFamily}
        onChange={(fontFamily) => setProps({ ...props, fontFamily })}
        list={FONTS}
      />
      <NumberInput
        label="Weight"
        value={props.fontWeight}
        onChange={(fontWeight) => setProps({ ...props, fontWeight })}
      />
      <SelectInput
        label="Align"
        value={props.textAlign}
        onChange={(textAlign) =>
          setProps({ ...props, textAlign: textAlign as keyof typeof TextAlign })
        }
        list={Object.keys(TextAlign)}
      />
    </>
  );
};

export const ImageEditor = ({
  props,
  setProps,
}: {
  props: ImageCompProps;
  setProps: (props: ImageCompProps) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Image details</p>
      <TextInput label="Src" value={props.src} onChange={(src) => setProps({ ...props, src })} />
      <SelectInput
        label="Fit"
        value={props.objectFit}
        onChange={(objectFit) =>
          setProps({ ...props, objectFit: objectFit as keyof typeof ObjectFit })
        }
        list={Object.keys(ObjectFit)}
      />
    </>
  );
};

export const DivEditor = ({
  props,
  setProps,
}: {
  props: DivCompProps;
  setProps: (props: DivCompProps) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Div editor</p>
      <ColorInput
        label="Back"
        value={props.backgroundColor}
        onChange={(backgroundColor) => setProps({ ...props, backgroundColor })}
      />
    </>
  );
};
