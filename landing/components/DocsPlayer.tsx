import { AllComponents, BaseProps } from "@motionly/base";
import { Player } from "@motionly/player";

const baseProps: BaseProps = {
  id: "",
  borderRadius: 0,
  rotation: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  from: 0,
  duration: 0,
};
export const DocsPlayer = (props: AllComponents) => {
  return null;
  // return (
  //   <Player
  //     template={{
  //       comps: [{ ...baseProps, ...props }],
  //       duration: 10,
  //       fps: 30,
  //       width: 1080,
  //       height: 600,
  //     }}
  //     controls
  //     autoPlay
  //     style={{ width: "100%" }}
  //   />
  // );
};
