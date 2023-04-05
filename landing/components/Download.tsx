import Link from "next/link";
import { release } from "~/config";

export const Download = () => {
  return (
    <Link href={release} target="_blank" className="bg-primary-500 p-2 font-bold text-lg rounded-md cursor-pointer text-primary-content">
      download
    </Link>
  );
};
