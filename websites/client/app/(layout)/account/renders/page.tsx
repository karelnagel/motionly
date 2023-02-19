"use client";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoImage } from "react-icons/io5";
import { MdOutlineMovieCreation } from "react-icons/md";
import { trpc } from "../../../ClientProvider";

export default function Renders() {
  const { data: renders } = trpc.renders.getAll.useQuery({});
  const stats = [
    {
      title: "Cost",
      value: renders?.totalCost?.toFixed(2),
      icon: AiOutlineDollarCircle,
      units: "$",
    },
    {
      title: "Total videos",
      value: renders?.mediaCount,
      icon: MdOutlineMovieCreation,
    },
    {
      title: "Total images",
      value: renders?.stillCount,
      icon: IoImage,
    },
  ];
  return (
    <div className="space-y-3">
      <div className="stats gradient text-primary-content shadow w-full ">
        {stats.map((stat) => (
          <div
            className="stat border-primary-content "
            key={stat.title}
          >
            <div className="stat-figure shrink-0">
              <stat.icon className="text-3xl" />
            </div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">
              {stat.units}
              {stat.value}
            </div>
          </div>
        ))}
      </div>

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
              <th
                className={
                  render.status === "COMPLETED"
                    ? "text-success"
                    : render.status === "FAILED"
                    ? "text-error"
                    : "text-info"
                }
              >
                {render.status}
              </th>
              <th>{render.progress}</th>
              <th>{render.cost}$</th>

              <th>
                {render.fileUrl && (
                  <a target="_blank" href={render.fileUrl}>
                    OPEN
                  </a>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
