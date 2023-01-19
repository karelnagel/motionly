"use client";

import { TemplateType } from "@asius/components";
import { postNewTemplate } from "@asius/sdk";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const emptyTemplate: TemplateType = {
  name: "Empty",
  description: "This is an empty template",
  width: 1080,
  height: 1080,
  fps: 30,
  duration: 10,
  background: "#FFFFFFFF",
  comps: [],
};
export const Clone = ({
  children,
  className,
  template = emptyTemplate,
}: {
  children: ReactNode;
  className?: string;
  template?: TemplateType;
}) => {
  const router = useRouter();

  const clone = async () => {
    const newTemplate = await postNewTemplate({
      ...template,
      id: undefined,
      name: `${template.name}`,
    });
    if (!newTemplate) return alert("Failed to clone template");
    router.push(`/edit/${newTemplate.id}`);
  };

  return (
    <div className={className} onClick={clone}>
      {children}
    </div>
  );
};
