import { TextAlign, TextStyle } from "@motionly/base";
import { getAvailableFonts } from "@remotion/google-fonts";
import { useState } from "react";
import { Input } from ".";

export const TextStyleInput = ({
  style,
  setStyle,
  prop,
}: {
  style: TextStyle;
  setStyle: (s: TextStyle) => void;
  prop?: string;
}) => {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full col-span-2">
      {show && (
        <div className="grid grid-cols-2 gap-2 pl-2">
          <Input
            type="select"
            prop={`${prop}.fontFamily`}
            label="Font"
            value={style.fontFamily}
            onChange={(fontFamily) => setStyle({ ...style, fontFamily })}
            options={getAvailableFonts().map((f) => ({
              label: f.fontFamily,
              value: f.fontFamily,
            }))}
          />
          <Input
            type="number"
            prop={`${prop}.fontSize`}
            label="Font size (px)"
            value={style.fontSize}
            onChange={(fontSize) => setStyle({ ...style, fontSize })}
          />
          <Input
            type="number"
            prop={`${prop}.lineHeight`}
            label="Line height (px)"
            value={style.lineHeight}
            onChange={(lineHeight) => setStyle({ ...style, lineHeight })}
          />
          <Input
            type="number"
            prop={`${prop}.fontWeight`}
            label="Font weight"
            value={style.fontWeight}
            onChange={(fontWeight) => setStyle({ ...style, fontWeight })}
          />
          <Input
            type="color"
            prop={`${prop}.color`}
            label="Color"
            value={style.color}
            onChange={(color) => setStyle({ ...style, color })}
          />
          <Input
            type="color"
            prop={`${prop}.bg`}
            label="BG"
            value={style.bg}
            onChange={(bg) => setStyle({ ...style, bg })}
          />
          <Input
            type="select"
            prop={`${prop}.textAlign`}
            label="Align"
            value={style.textAlign}
            onChange={(textAlign) =>
              setStyle({
                ...style,
                textAlign: textAlign as TextAlign,
              })
            }
            options={Object.keys(TextAlign).map((a) => ({
              label: a,
              value: a,
            }))}
          />
          <Input
            prop={`${prop}.outlineColor`}
            type="color"
            label="Outline Color"
            value={style.outlineColor}
            onChange={(outlineColor) =>
              setStyle({
                ...style,
                outlineColor,
              })
            }
          />
          {style.outlineColor && (
            <Input
              prop={`${prop}.outlineWidth`}
              type="number"
              label="Outline Width (px)"
              value={style.outlineWidth}
              onChange={(outlineWidth) =>
                setStyle({
                  ...style,
                  outlineWidth,
                })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};
