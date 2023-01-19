import Link from "next/link";
import { getTemplate } from "../../../../pages/api/templates/[id]";
import { Player } from "./Player";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTemplate({ id });
  if (!template) return <div>Template not found!</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="space-y-10 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="indicator">
            {template.public && (
              <span className="indicator-item badge badge-secondary font-bold">
                PUBLIC
              </span>
            )}
            <div className="text-3xl font-bold">{template.name}</div>
          </div>
          <p className="text-lg">{template.description}</p>
          <p>
            <b>Duration:</b> {template.duration} seconds
          </p>
          <p>
            <b>Dimensions:</b> {template.width} x {template.height}
          </p>
        </div>
        <div className="space-x-2">
          {template.isOwner && (
            <Link href={`/edit/${template.id}`} className="btn">
              Edit
            </Link>
          )}
          <button className="btn">Clone</button>
        </div>
      </div>
      <Player
        width={template.width}
        height={template.height}
        fps={template.fps}
        comps={template.comps}
        background={template.background}
        duration={template.duration}
        allowFullscreen
        clickToPlay
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
}
