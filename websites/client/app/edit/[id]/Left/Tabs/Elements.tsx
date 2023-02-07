import { getRandomId } from "../../../../../helpers";
import { useProject } from "../../../../../hooks/useProject";
import {
  sections,
  Section,
  Element,
  getWidthAndHeight,
} from "../../../../../videos/elements";

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
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold">{s.title}</p>
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
  return (
    <div
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
      <video
        src={`/elements/${file}.mp4`}
        className="aspect-square w-full rounded-lg bg-white"
        onLoadedData={(event) => (event.currentTarget.currentTime = 5)}
        onMouseOver={(event) => {
          event.currentTarget.currentTime = 0;
          event.currentTarget.play();
        }}
        onMouseOut={(event) => {
          event.currentTarget.currentTime = 5;
          event.currentTarget.pause();
        }}
        muted
        loop
      />
      <p className="leading-none text-sm">{element.title}</p>
    </div>
  );
};
