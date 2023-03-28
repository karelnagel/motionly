"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { trpc } from "../providers/TRPCProvider";
import { useAlerts } from "./Alert";

export const DeleteProject = ({ children, className, id }: { children: ReactNode; className?: string; id?: string }) => {
  const router = useRouter();
  const alert = useAlerts((s) => s.addAlert);
  const { mutateAsync } = trpc.projects.delete.useMutation({});
  const remove = async () => {
    if (!id) return;
    const newProject = await mutateAsync({ id });
    if (!newProject) return alert("Failed to delete template", "error");
    router.refresh();
    alert(`Template deleted`, "success");
  };

  return (
    <div
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        remove();
      }}
    >
      {children}
    </div>
  );
};
