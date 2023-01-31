import { Input, TemplateType } from "@motionly/base";
import { useEffect, useRef, useState } from "react";

const baseTemplate: TemplateType = {
  comps: [
    {
      comp: "image",
      objectFit: "cover",
      src: "https://picsum.photos/seed/motionly/1080/1080",
      id: "57xdgoo",
      x: 0,
      y: 0,
      width: 1080,
      height: 336,
      borderRadius: 0,
      duration: 0,
      from: 0,
      rotation: 0,
      animations: [],
    },
    {
      comp: "text",
      textStyle: {
        bg: {
          type: "basic",
          color: "#ffffffFF",
        },
        color: {
          type: "basic",
          color: "#000000FF",
        },
        fontSize: 120,
        fontFamily: "Inter",
        fontWeight: 700,
        textAlign: "center",
      },
      text: "Hello World",
      justifyContent: "center",
      id: "xdm6o1",
      x: 134.70577960000006,
      y: 453.6761802,
      width: 745,
      height: 500,
      borderRadius: 0,
      duration: 0,
      from: 0,
      rotation: 0,
      animations: [
        {
          prop: "translateX",
          type: "spring",
          start: 0.1,
          from: -1000,
          to: 1,
          duration: 0,
          mass: 1,
          damping: 14,
          stiffness: 80,
        },
        {
          prop: "translateX",
          type: "spring",
          start: -2,
          from: 0,
          to: 1000,
          duration: 0,
          mass: 1,
          damping: 14,
          stiffness: 80,
        },
      ],
    },
  ],
  inputs: [
    {
      id: "1iunl",
      type: "textarea",
      label: "Text",
      value: "Hello World",
      properties: [
        {
          prop: "text",
          id: "xdm6o1",
        },
      ],
    },
    {
      id: "b8e0gxs",
      type: "image",
      label: "Image src",
      value: "https://picsum.photos/seed/motionly/1080/1080",
      properties: [
        {
          prop: "src",
          id: "57xdgoo",
        },
      ],
    },
    {
      id: "wper7dj",
      type: "number",
      label: "Image height",
      value: 336,
      properties: [
        {
          prop: "height",
          id: "57xdgoo",
        },
      ],
    },
    {
      id: "33zg3db",
      type: "color",
      label: "Bg color",
      value: {
        type: "basic",
        color: "#ff0000",
      },
      properties: [
        {
          prop: "background",
          id: "template",
        },
      ],
    },
  ],
  width: 1080,
  height: 1080,
  duration: 10,
  fps: 30,
  background: {
    type: "basic",
    color: "#ff0000FF",
  },
};

export default function TestIFrame() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [template, setTemplate] = useState<TemplateType>(baseTemplate);
  const send = () => {
    ref.current?.contentWindow?.postMessage(
      { call: "setTemplate", template },
      "*"
    );
  };
  useEffect(() => {
    ref.current.contentWindow.onload = () => {
      send();
    };
  }, []);

  useEffect(() => {
    send();
  }, [template]);

  const setValue = (id: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      inputs: template.inputs.map((i) => (i.id === id ? { ...i, value } : i)),
    }));
  };
  
  return (
    <div className="max-w-screen-md m-auto mt-10 space-y-10 p-2">
      <iframe
        ref={ref}
        src="/iframe?controls=true&loop=true"
        className="w-full"
        style={{ aspectRatio: `${template.width}/${template.height}` }}
      />
      <div className="flex flex-col space-y-2">
        {template.inputs.map((input) => (
          <Input input={input} key={input.id} setValue={setValue} />
        ))}
      </div>
    </div>
  );
}

const Input = ({
  input,
  setValue,
}: {
  input: Input;
  setValue: (id: string, value: any) => void;
}) => {
  return (
    <div key={input.id}>
      {(input.type === "number" || input.type === "text") && (
        <input
          className="input input-bordered w-full"
          type={input.type}
          value={input.value === undefined ? "" : input.value}
          onChange={(e) =>
            setValue(input.id, Number(e.target.value) || e.target.value)
          }
        />
      )}
      {input.type === "textarea" && (
        <textarea
          className="textarea textarea-bordered w-full"
          value={input.value === undefined ? "" : input.value}
          onChange={(e) =>
            setValue(input.id, Number(e.target.value) || e.target.value)
          }
        />
      )}

      {(input.type === "image" ||
        input.type === "video" ||
        input.type === "gif") && (
        <div className="flex items-center">
          {input.type === "video" ? (
            <video src={input.value} className="h-10 w-10" />
          ) : (
            <img src={input.value} className="h-10 w-10" />
          )}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const blobUrl = URL.createObjectURL(file);
              setValue(input.id, blobUrl);
            }}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            value={input.value}
            onChange={(e) =>
              setValue(input.id, Number(e.target.value) || e.target.value)
            }
          />
        </div>
      )}
      {input.type === "color" && (
        <input
          type="color"
          className="input input-bordered w-full"
          value={input.value.color}
          onChange={(e) => {
            setValue(input.id, { type: "basic", color: e.target.value });
          }}
        />
      )}
    </div>
  );
};
