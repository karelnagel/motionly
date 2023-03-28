import Link from "next/link";
import { IoImage } from "react-icons/io5";
import { MdOutlineMovieCreation } from "react-icons/md";
import { RenderProgress } from "../types";

export const OneRender = ({ render }: { render: RenderProgress }) => {
    if (!render) return null;
    return (
      <div
        className={`flex flex-col  rounded-lg ${
          render.status === "FAILED"
            ? "bg-error text-error-content"
            : "bg-base-100"
        }`}
      >
        <div className="flex items-center p-2 space-x-2 justify-between">
          <div className="flex space-x-2">
            <div className="text-xl">
              {render.type === "STILL" ? <IoImage /> : <MdOutlineMovieCreation />}
            </div>
            <p className="text-sm">{render.id}</p>
          </div>
  
          {render.fileUrl && (
            <Link
              href={render.fileUrl}
              target="_blank"
              className="uppercase font-semibold text-sm"
            >
              Open
            </Link>
          )}
        </div>
        <progress
          value={render.progress}
          max={1}
          className={`progress ${
            render.status === "FAILED"
              ? "progress-error"
              : render.status === "PROCESSING"
              ? "progress-info"
              : "progress-success"
          }`}
        />
      </div>
    );
  };
  