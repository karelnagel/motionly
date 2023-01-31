import Link from "next/link";
import { insider } from "../../videos/insider";

export default function Insider() {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-3xl my-6">All insider templates</p>
      {Object.keys(insider).map((key) => (
        <Link href={`/insider/${key}`} key={key} className="">
          {key}
        </Link>
      ))}
    </div>
  );
}
