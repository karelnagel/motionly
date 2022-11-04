"use client";
import { DivType, ElementType, ImageType, SizeType, TextType } from "../types";
import { ColorInput, NumberInput, TextInput } from "./inputs";

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
    <div className="bg-gray-600 h-full w-full">
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
    <div>
      {/* <TextInput label="Template Name" value={template.name} onChange={(name) => setTemplate({...template, name})} /> */}
      <NumberInput
        label="Template Width"
        value={size.width}
        onChange={(width) => setSize({ ...size, width })}
      />
      <NumberInput
        label="Template Height"
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
    <div className="h-full w-full">
      {element && (
        <>
          <p>{element.id}</p>
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
            label="Height"
            value={element.height}
            onChange={(height) => setElement({ ...element, height })}
          />
          <NumberInput
            label="width"
            value={element.width}
            onChange={(width) => setElement({ ...element, width })}
          />
          <NumberInput
            label="border radius"
            value={element.borderRadius}
            onChange={(borderRadius) => setElement({ ...element, borderRadius })}
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
    <div>
      <p>Text editor</p>
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
        label="Background"
        value={element.backgroundColor}
        onChange={(backgroundColor) => setElement({ ...element, backgroundColor })}
      />
      <NumberInput
        label="Font size"
        value={element.fontSize}
        onChange={(fontSize) => setElement({ ...element, fontSize })}
      />
      <TextInput
        label="Font family"
        value={element.fontFamily}
        onChange={(fontFamily) => setElement({ ...element, fontFamily })}
      />
      <TextInput
        label="Font weight"
        value={element.fontWeight}
        onChange={(fontWeight) => setElement({ ...element, fontWeight })}
      />
      <TextInput
        label="Text align"
        value={element.textAlign}
        onChange={(textAlign) => setElement({ ...element, textAlign })}
      />
    </div>
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
    <div>
      <p>Image editor</p>
      <TextInput
        label="Src"
        value={element.src}
        onChange={(src) => setElement({ ...element, src })}
      />
      <TextInput
        label="Object fit "
        value={element.objectFit}
        onChange={(objectFit) => setElement({ ...element, objectFit: objectFit as any })}
      />
    </div>
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
    <div>
      <p>Div editor</p>
      <ColorInput
        label="Src"
        value={element.backgroundColor}
        onChange={(backgroundColor) => setElement({ ...element, backgroundColor })}
      />
    </div>
  );
};
