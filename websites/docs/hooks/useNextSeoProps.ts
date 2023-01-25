import { useRouter } from "next/router";

export default function useNextSeoProps() {
  const { route } = useRouter();
  if (route !== "/") {
    return {
      titleTemplate: "%s – Motionly",
    };
  }
  return "Motionly";
}
