import { useTheme } from "nextra-theme-docs";
import Image from "next/image";

export const Logo = () => {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "light" ? "/asius.png" : "/asiusdark.png"}
      width={100}
      height={200}
      alt="logo"
    />
  );
};
