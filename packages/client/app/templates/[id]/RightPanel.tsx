"use client";

import { ColorInput, NumberInput, SelectInput, TextInput } from "../../../components/inputs";
import { FONTS } from "../../../config";
import {
  CompProps,
  DivCompProps,
  ImageCompProps,
  ObjectFit,
  TemplateType,
  TextAlign,
  TextCompProps,
  TextStyle,
} from "@asius/types";

export const RightPanel = ({
  comp,
  setComp,
  template,
  setTemplate,
}: {
  comp: CompProps | null;
  setComp: (element: CompProps) => void;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
}) => {
  return (
    <div className="bg-base-100 border-t h-full w-full">
      {comp && <CompEditor comp={comp} setComp={setComp} />}
      {!comp && <TemplateEditor template={template} setTemplate={setTemplate} />}
    </div>
  );
};

export const TemplateEditor = ({
  template,
  setTemplate,
}: {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
}) => {
  return (
    <div className="w-full grid grid-cols-2 items-center justify-items-start gap-3 py-10 px-4">
      <p className="text-xl font-bold col-span-2">Template</p>
      <NumberInput
        label="W"
        value={template.width}
        onChange={(width) => setTemplate({ ...template, width })}
      />
      <NumberInput
        label="H"
        value={template.height}
        onChange={(height) => setTemplate({ ...template, height })}
      />
    </div>
  );
};

export const CompEditor = ({
  comp,
  setComp,
}: {
  comp?: CompProps;
  setComp: (element: CompProps) => void;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 items-center justify-items-start gap-3  py-10 px-4">
      {comp && (
        <>
          <NumberInput label="X" value={comp.x} onChange={(x) => setComp({ ...comp, x })} />
          <NumberInput label="Y" value={comp.y} onChange={(y) => setComp({ ...comp, y })} />
          <NumberInput
            label="W"
            value={comp.width}
            onChange={(width) => setComp({ ...comp, width })}
          />
          <NumberInput
            label="H"
            value={comp.height}
            onChange={(height) => setComp({ ...comp, height })}
          />
          <NumberInput
            label="RAD"
            value={comp.borderRadius}
            onChange={(borderRadius) => setComp({ ...comp, borderRadius })}
          />
          <NumberInput
            label="ROT"
            value={comp.rotation}
            onChange={(rotation) => setComp({ ...comp, rotation })}
          />
          <NumberInput
            label="FROM"
            value={comp.from}
            onChange={(from) => setComp({ ...comp, from })}
          />
          <NumberInput
            label="DUR"
            value={comp.duration}
            onChange={(duration) => setComp({ ...comp, duration })}
          />
          {comp.type === "text" && <TextEditor props={comp} setProps={setComp} />}
          {comp.type === "image" && <ImageEditor props={comp} setProps={setComp} />}
          {comp.type === "div" && <DivEditor props={comp} setProps={setComp} />}
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
