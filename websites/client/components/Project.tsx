import Link from "next/link";
import Image from "next/image";
import { IoIosBrush, IoIosCopy, IoIosTrash } from "react-icons/io";
import { Clone } from "./Clone";
import { DeleteProject } from "./DeleteProject";
import { Project as ProjectType } from "../types";

export const Project = ({
  project,
  isOwner,
}: {
  project: ProjectType;
  isOwner?: boolean;
}) => {
  return (
    <div className="bg-base-200 shadow-xl aspect-square flex flex-col overflow-hidden rounded-lg">
      <div className="relative bg-base-300 h-full group">
        {project.preview && (
          <Image
            src={project.preview}
            fill={true}
            alt="template"
            className="object-cover"
          />
        )}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 duration-150 flex space-x-1">
          {isOwner && (
            <Link href={`/edit/${project.id}`}>
              <IoIosBrush className="hover:text-info bg-base-200 rounded-full p-2 w-8 h-8 cursor-pointer" />
            </Link>
          )}
          <Clone project={project}>
            <IoIosCopy className="hover:text-info bg-base-200 rounded-full p-2 w-8 h-8 cursor-pointer" />
          </Clone>
          {isOwner && (
            <DeleteProject id={project.id}>
              <IoIosTrash className="hover:text-error bg-base-200 rounded-full p-2 w-8 h-8 cursor-pointer" />
            </DeleteProject>
          )}
        </div>
      </div>

      <Link href={`edit/${project.id}`} className="grid grid-rows-3 gap-1 p-1">
        <h2 className="card-title line-clamp-1">{project.name}</h2>
        <p className="line-clamp-3">{project.description}</p>
        <div className="card-actions justify-end flex-nowrap">
          {project.tags
            .filter((t) => !!t)
            .map((t, i) => (
              <div key={i} className="badge badge-outline">
                {t}
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
};
