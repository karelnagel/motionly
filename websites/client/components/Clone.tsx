"use client";

import { TemplateType } from "@motionly/base";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { trpc } from "../app/ClientProvider";
import { Project } from "../types";
import { useAlerts } from "./Alert";
const template: TemplateType = {
  width: 1080,
  height: 1080,
  fps: 30,
  duration: 10,
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  childIds: [],
  components: {},
};

const emptyProject: Project = {
  name: "Empty",
  description: "This is an empty template",
  template,
};
export const Clone = ({
  children,
  className,
  project = emptyProject,
}: {
  children: ReactNode;
  className?: string;
  project?: Project;
}) => {
  const router = useRouter();
  const alert = useAlerts((s) => s.addAlert);
  const postNewProject = trpc.templates.new.useMutation({});
  const clone = async () => {
    const newProject = await postNewProject.mutateAsync({
      ...project,
      id: undefined,
      name: `${project.name}`,
    });
    if (!newProject) return alert("Failed to clone template", "error");
    router.push(`/edit/${newProject.id}`);
    alert("Cloned template", "success");
  };

  return (
    <div className={className} onClick={clone}>
      {children}
    </div>
  );
};
