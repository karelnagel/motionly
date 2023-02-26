import Link from "next/link";
import { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="title">{children}</h1>;
};

const A = ({ children, href }: { children: ReactNode; href: string }) => {
  return (
    <Link href={href} className="text-primary">
      {children}
    </Link>
  );
};
export function useMDXComponents(components: any) {
  return { h1: H1, a: A, ...components };
}
