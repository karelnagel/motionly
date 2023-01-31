import { Player } from "@motionly/player";
import { useRender } from "@motionly/renderer";
import { useRouter } from "next/router";
import { useState } from "react";
import { insider } from "../../videos/insider";

export default function Insider() {
  const router = useRouter();
  const id = router.query.id as string;
  const video = insider[id];
  if (!video) return <div>Not found</div>;

  const [inputs, setInputs] = useState(video.inputs);
  const template = video.template(inputs);
  const { media, cost, fileUrl, progress, status } = useRender(template);
  return (
    <div className="flex flex-col items-center max-w-screen-lg m-auto space-y-6 my-10">
      <h1 className="font-bold text-3xl ">{id}</h1>
      <div className="flex flex-col w-full">
        {Object.entries(inputs).map(([key, input], index) => (
          <div key={index} className="form-control">
            <label className="label label-text">{input.label}</label>
            <input
              className="input input-bordered"
              type={input.type}
              value={input.value}
              onChange={(e) => {
                const newInputs = { ...inputs };
                newInputs[key].value = e.target.value;
                setInputs(newInputs);
              }}
            />
          </div>
        ))}
      </div>
      <Player
        comps={template.comps}
        duration={template.duration}
        fps={template.fps}
        height={template.height}
        width={template.width}
        background={template.background}
        controls
        style={{ width: "100%" }}
      />

      <button disabled={status === "rendering"} className="btn" onClick={media}>
        Render
      </button>
      <div>
        {status && (
          <div>
            <progress className="progress" value={progress} max="1" />
            <p>Cost: {cost}</p>
            <p>Status: {status}</p>
            <a target="_blank" href={fileUrl}>
              {fileUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
