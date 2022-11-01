import { Template } from "../components/template";
import { DEFAULT_TEMPLATE } from "../types/defaults";

export interface Template {
  name: string;
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-400">
      <div className="scale-50 overflow-hidden border border-black">
        <Template template={DEFAULT_TEMPLATE} modifications={[]} />
      </div>
    </div>
  );
}
