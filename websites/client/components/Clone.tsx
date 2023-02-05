"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { postNewProject } from "../sdk/templates/new";
import { Project } from "../types";
import { useAlerts } from "./Alert";

const emptyProject: Project = {
  name: "Empty",
  description: "This is an empty template",
  template: {
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
  },
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
  const alert = useAlerts();
  const clone = async () => {
    const newProject = await postNewProject({
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
