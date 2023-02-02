"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { postNewTemplate } from "../sdk/templates/new";
import { Template } from "../types";
import { useAlerts } from "./Alert";

const emptyTemplate: Template = {
  name: "Empty",
  description: "This is an empty template",
  width: 1080,
  height: 1080,
  fps: 30,
  duration: 10,
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  comps: [],
};
export const Clone = ({
  children,
  className,
  template = emptyTemplate,
}: {
  children: ReactNode;
  className?: string;
  template?: Template;
}) => {
  const router = useRouter();
  const alert = useAlerts();
  const clone = async () => {
    const newTemplate = await postNewTemplate({
      ...template,
      id: undefined,
      name: `${template.name}`,
    });
    if (!newTemplate) return alert("Failed to clone template", "error");
    router.push(`/edit/${newTemplate.id}`);
    alert("Cloned template", "success");
  };

  return (
    <div className={className} onClick={clone}>
      {children}
    </div>
  );
};
