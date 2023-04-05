import Link from "next/link";
import { release } from "~/config";

export const Download = () => {
  return (
    <Link
      href={release}
      target="_blank"
      className="bg-gradient-to-tr from-primary-500 to-pink-200 via-red-400 dark:to-pink-900 font-bold text-lg rounded-md cursor-pointer py-2 text-primary-content text-center w-40"
    >
      Download
    </Link>
  );
};
