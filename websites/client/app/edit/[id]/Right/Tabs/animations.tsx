import { ComponentProps } from "@motionly/base";
import { Tab } from ".";
import { MdAnimation } from "react-icons/md";
import { useProject } from "../../../../../hooks/useProject";
import { getRandomId, lowRep } from "../../../../../helpers";
import { allAnimations } from "../../../../../videos/animations";
import { useComponent } from "../../../../../hooks/useComponent";

export const component = () => {
  const setComp = useProject((t) => t.setComp);
  const animations = useProject(
    (t) => t.project.template.components[t.selected].animations
  );
  const comp = useComponent();
  if (!comp) return <></>;
  return (
    <div className="flex flex-col space-y-6 col-span-2">
      <div>
        Current
        {animations?.allIds.map((id) => {
          const animation = animations.byIds[id];
          if (!animation) return null;
          return (
            <div
              key={id}
              onClick={() =>
                setComp((c) => {
                  if (!c.animations) c.animations = { allIds: [], byIds: {} };
                  c.animations.allIds = c.animations.allIds.filter(
                    (i) => i !== id
                  );
                  delete c.animations.byIds[id];
                })
              }
            >
              {animation.prop}
            </div>
          );
        })}
      </div>
      <div className="w-full space-y-2 text-lg">
        <p className="font-bold">Add</p>
        <div className="flex flex-col space-y-2 w-full">
          {allAnimations(comp).map((section, i) => (
            <div key={i} className="space-y-1">
              <p className="text-sm font-semibold">{section.name}</p>
              <div className="grid grid-cols-4 gap-1">
                {section.animations.map((animation, i) => (
                  <div
                    className="flex flex-col space-y-1 items-center cursor-pointer hover:scale-105 duration-150"
                    key={i}
                    onClick={() =>
                      setComp((c) => {
                        if (!c.animations)
                          c.animations = { allIds: [], byIds: {} };
                        for (const anim of animation.animations) {
                          const id = getRandomId();
                          c.animations.byIds[id] = { ...anim, id };
                          c.animations.allIds.push(id);
                        }
                      })
                    }
                  >
                    <video
                      className="rounded-lg aspect-square bg-white"
                      disablePictureInPicture
                      src={lowRep(
                        `/animations/${section.name}_${animation.name}.mp4`
                      )}
                      autoPlay
                      muted
                      loop
                    />
                    <p className="text-[13px] text-center whitespace-nowrap overflow-hidden">
                      {animation.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const animations: Tab<ComponentProps> = {
  name: "Animations",
  Icon: MdAnimation,
  component,
};
