"use client";

import { IoImage } from "react-icons/io5";
import { MdOutlineMovieCreation } from "react-icons/md";
import { trpc } from "../../../ClientProvider";

export default function Renders() {
  const { data: renders } = trpc.renders.getAll.useQuery({});
  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>status</th>
            <th>progress</th>
            <th>cost</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {renders?.renders?.map((render) => (
            <tr key={render.id} className="">
              <th className="text-2xl">
                {render.type === "STILL" ? (
                  <IoImage />
                ) : (
                  <MdOutlineMovieCreation />
                )}
              </th>
              <th>{render.id}</th>
              <th>{render.status}</th>
              <th>{render.progress}</th>
              <th>{render.cost}$</th>
              {render.fileUrl && (
                <th>
                  <a target="_blank" href={render.fileUrl}>
                    OPEN
                  </a>
                </th>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
