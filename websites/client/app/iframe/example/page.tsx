"use client";

import { Variable as VariableType, TemplateType } from "@motionly/base";
import { useEffect, useRef, useState } from "react";

const baseTemplate: TemplateType = {
  components: {},
  childIds: [],

  width: 1080,
  height: 1080,
  duration: 10,
  fps: 30,
  bg: {
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
    if (!ref.current?.contentWindow) return;
    ref.current.contentWindow.onload = () => {
      send();
    };
  }, []);

  useEffect(() => {
    send();
  }, [template]);

  const setValue = (id: string, value: any) => {
    setTemplate((prev) => {
      const newTemplate = { ...prev };
      const input = newTemplate.variables?.byIds[id];
      if (input) {
        input.value = value;
      }
      return newTemplate;
    });
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
        {template.variables?.allIds.map((inputId) => (
          <Input
            input={template.variables?.byIds[inputId]!}
            key={inputId}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
}

const Input = ({
  input,
  setValue,
}: {
  input: VariableType;
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
              const file = e.target.files?.[0];
              const blobUrl = URL.createObjectURL(file!);
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
