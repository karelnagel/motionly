"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Error from "next/error";
import { blog } from "./blog";
import { docs } from "./docs";
import { legal } from "./legal";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useState } from "react";

export type Page = {
  id: string;
  title: string;
  pages?: Page[];
};

const collections: Page[] = [blog, docs, legal];

export default function MDXLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const paths = pathname?.split("/").filter((x) => x);
  const collection = collections.find((c) => c.id === paths?.[0]);
  if (!collection || !paths) return <Error statusCode={404} />;

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-4 px-2">
      <div className="hidden md:flex flex-col w-full space-y-1">
        {collection.pages?.map((page) => (
          <MenuItem key={page.id} {...page} parents={`/${collection.id}`} />
        ))}
      </div>
      <div className="col-span-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <BreadCrumb page={collection} paths={paths} />
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}

const BreadCrumb = ({
  paths,
  page,
  i = 0,
}: {
  page: Page;
  paths: string[];
  i?: number;
}) => {
  const next = page.pages?.find((p) => p.id === paths[i + 1]);
  return (
    <>
      <li>
        {i !== paths.length - 1 ? (
          <Link href={`/${paths.slice(0, i + 1).join("/")}`} className="">
            {page.title}
          </Link>
        ) : (
          <p className="text-primary">{page.title}</p>
        )}
      </li>
      {next && <BreadCrumb page={next} paths={paths} i={i + 1} />}
    </>
  );
};

const MenuItem = ({
  id,
  title,
  pages,
  parents,
}: Page & { parents: string }) => {
  const url = `${parents}/${id}`;
  const pathname = usePathname();
  const isSelected = pathname === url;
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col space-y-1">
      <div
        className={`w-full bg-opacity-10 rounded-md duration-150 flex justify-between items-center px-2 ${
          isSelected
            ? "bg-primary text-primary"
            : "hover:bg-base-content hover:bg-opacity-10"
        }`}
      >
        <Link
          className="h-full w-full py-1 opacity-90"
          href={url}
          onClick={() => isSelected && setOpen(!open)}
        >
          {title}
        </Link>
        {pages && (
          <MdOutlineArrowForwardIos
            onClick={() => setOpen(!open)}
            className={`text-sm duration-200 cursor-pointer ${
              open ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
      {open && pages && (
        <div className="flex">
          <div className="w-6 flex justify-center">
            <div className="bg-base-content bg-opacity-20 w-[1px] h-full " />
          </div>
          <div className="w-full">
            {pages?.map((page) => (
              <MenuItem key={page.id} {...page} parents={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
