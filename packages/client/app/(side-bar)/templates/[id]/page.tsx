import Link from "next/link";
import { Clone } from "../../../../components/Clone";
import { getServerSession } from "../../../../lib/getServerSession";
import { getTemplate } from "../../../../pages/api/templates/[id]";
import { Player } from "./Player";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTemplate({ id });
  const session = await getServerSession();
  if (!template) return <div>Template not found!</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="space-y-10 flex flex-col justify-between">
        <div className="space-y-2">
          <p className="text-3xl font-bold text-center md:text-left">
            {template.name}
          </p>
          {template.public && (
            <span className="badge badge-primary font-bold">PUBLIC</span>
          )}
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
          {session?.user ? (
            <Clone template={template} className="btn">
              Clone
            </Clone>
          ) : (
            <p>Login to clone</p>
          )}
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
