"use client";

import { DivType, ElementType, ImageType, SizeType, TextType, ObjectFit } from "@imageapi/types";
import { ColorInput, NumberInput, SelectInput, TextInput } from "../../../components/inputs";
import { FONTS } from "../../../config";

export const RightPanel = ({
  element,
  setElement,
  size,
  setSize,
}: {
  element?: ElementType;
  setElement?: (element: ElementType) => void;
  size: SizeType;
  setSize: (size: SizeType) => void;
}) => {
  return (
    <div className="bg-base-100 border-t h-full w-full">
      {element && setElement && <ElementEditor element={element} setElement={setElement} />}
      {!element && <TemplateEditor size={size} setSize={setSize} />}
    </div>
  );
};

export const TemplateEditor = ({
  size,
  setSize,
}: {
  size: SizeType;
  setSize: (template: SizeType) => void;
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
  element,
  setElement,
}: {
  element?: ElementType;
  setElement: (element: ElementType) => void;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 items-center justify-items-start gap-3  py-10 px-4">
      {element && (
        <>
          <NumberInput
            label="X"
            value={element.x}
            onChange={(x) => setElement({ ...element, x })}
          />
          <NumberInput
            label="Y"
            value={element.y}
            onChange={(y) => setElement({ ...element, y })}
          />
          <NumberInput
            label="W"
            value={element.width}
            onChange={(width) => setElement({ ...element, width })}
          />
          <NumberInput
            label="H"
            value={element.height}
            onChange={(height) => setElement({ ...element, height })}
          />
          <NumberInput
            label="RAD"
            value={element.borderRadius}
            onChange={(borderRadius) => setElement({ ...element, borderRadius })}
          />
          <NumberInput
            label="ROT"
            value={element.rotation}
            onChange={(rotation) => setElement({ ...element, rotation })}
          />
          <NumberInput
            label="FROM"
            value={element.from}
            onChange={(from) => setElement({ ...element, from })}
          />
          <NumberInput
            label="DUR"
            value={element.duration}
            onChange={(duration) => setElement({ ...element, duration })}
          />
          {element.type === "text" && <TextEditor element={element} setElement={setElement} />}
          {element.type === "image" && <ImageEditor element={element} setElement={setElement} />}
          {element.type === "div" && <DivEditor element={element} setElement={setElement} />}
        </>
      )}
    </div>
  );
};

export const TextEditor = ({
  element,
  setElement,
}: {
  element: TextType;
  setElement: (element: TextType) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Text details</p>
      <TextInput
        label="Text"
        value={element.text}
        onChange={(text) => setElement({ ...element, text })}
      />
      <ColorInput
        label="Color"
        value={element.color}
        onChange={(color) => setElement({ ...element, color })}
      />
      <ColorInput
        label="Back"
        value={element.backgroundColor}
        onChange={(backgroundColor) => setElement({ ...element, backgroundColor })}
      />
      <NumberInput
        label="Size"
        className="col-span-2"
        value={element.fontSize}
        onChange={(fontSize) => setElement({ ...element, fontSize })}
      />
      <SelectInput
        label="Family"
        value={element.fontFamily}
        onChange={(fontFamily) => setElement({ ...element, fontFamily })}
        list={FONTS}
      />
      <NumberInput
        label="Weight"
        value={element.fontWeight}
        onChange={(fontWeight) => setElement({ ...element, fontWeight })}
      />
      <SelectInput
        label="Align"
        value={element.textAlign}
        onChange={(textAlign) => setElement({ ...element, textAlign })}
        list={["left", "center", "right"]}
      />
    </>
  );
};

export const ImageEditor = ({
  element,
  setElement,
}: {
  element: ImageType;
  setElement: (element: ImageType) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Image details</p>
      <TextInput
        label="Src"
        value={element.src}
        onChange={(src) => setElement({ ...element, src })}
      />
      <SelectInput
        label="Fit"
        value={element.objectFit}
        onChange={(objectFit) => setElement({ ...element, objectFit: objectFit as any })}
        list={Object.keys(ObjectFit)}
      />
    </>
  );
};

export const DivEditor = ({
  element,
  setElement,
}: {
  element: DivType;
  setElement: (element: DivType) => void;
}) => {
  return (
    <>
      <p className="col-span-2 text-lg font-bold">Div editor</p>
      <ColorInput
        label="Back"
        value={element.backgroundColor}
        onChange={(backgroundColor) => setElement({ ...element, backgroundColor })}
      />
    </>
  );
};
