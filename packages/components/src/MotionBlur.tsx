import { MotionBlurProps } from "@asius/base";
import { Trail } from "@remotion/motion-blur";
import { ReactNode } from "react";

export const MotionBlur = ({
  props,
  children,
}: {
  children: ReactNode;
  props?: MotionBlurProps;
}) => {
  console.log(props);
  if (!props) return <>{children}</>;
  return (
    <Trail {...props}>
      <>{children}</>
    </Trail>
  );
};
