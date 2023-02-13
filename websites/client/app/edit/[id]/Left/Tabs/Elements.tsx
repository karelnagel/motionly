import Image from "next/image";
import { useState } from "react";
import { getRandomId } from "../../../../../helpers";
import { useProject } from "../../../../../hooks/useProject";
import {
  sections,
  Section,
  Element,
  getWidthAndHeight,
} from "../../../../../videos/elements";
import { components } from "../../Right/Tabs/components";

export default function Elements() {
  return (
    <div className="overflow-auto flex flex-col space-y-7">
      {sections.map((s, i) => {
        return <Section key={i} {...s} />;
      })}
    </div>
  );
}

const Section = (s: Section) => {
  const value = components[s.title];
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 items-center" style={{ color: `hsl(${value.hue}, 50%, 70%)` }}>
        <value.Icon
          className="text-xl"
          
        />
        <p className="font-semibold">{value.name}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {s.elements.map((e, i) => {
          return (
            <Element key={i} {...e} element={e} file={`${s.title}_${i}`} />
          );
        })}
      </div>
    </div>
  );
};

const Element = ({ element, file }: { element: Element; file: string }) => {
  const templateWidth = useProject((s) => s.project.template.width);
  const templateHeight = useProject((s) => s.project.template.height);
  const addComp = useProject((s) => s.addComp);
  const size = Math.max(templateHeight, templateWidth) * 0.2;
  const { height, width } = getWidthAndHeight(size, element.aspectRatio);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={() =>
        addComp({
          ...element.props,
          id: getRandomId(),
          width,
          height,
          x: templateWidth / 2 - width / 2,
          y: templateHeight / 2 - height / 2,
        })
      }
      className="flex flex-col items-center cursor-pointer space-y-2"
    >
      {!isHovering && (
        <Image
          className="aspect-square w-full rounded-lg bg-white"
          src={`/elems/${file}.jpg`}
          height={300}
          width={300}
          alt={element.title}
        />
      )}
      {isHovering && (
        <video
          disablePictureInPicture
          src={`/elems/${file}.mp4`}
          className="aspect-square w-full rounded-lg bg-white"
          onMouseOver={(event) => {
            event.currentTarget.currentTime = 0;
            event.currentTarget.play();
          }}
          onMouseOut={(event) => {
            event.currentTarget.pause();
          }}
          muted
          loop
        />
      )}
      <p className="leading-none text-sm text-center">{element.title}</p>
    </div>
  );
};
