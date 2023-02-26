import Link from "next/link";
import { getServerSession } from "../../../../lib/getServerSession";

const sections = [
  {
    title: "Settings",
    path: "/account",
  },
  {
    title: "Renders",
    path: "/account/renders",
  },
  {
    title: "API Keys",
    path: "/account/keys",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    return <div>Not logged in!</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3 bg-base-100 rounded-lg overflow-hidden">
          <img
            width={40}
            height={40}
            alt="Profile picture"
            src={session.user?.image ?? ""}
            className="aspect-square"
          />
          <div>{session.user.name}</div>
        </div>
        <div className="flex flex-col  space-y-3">
          {sections.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className="bg-base-200 flex items-center justify-center rounded-lg h-[40px]"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-3 w-full">{children}</div>
    </div>
  );
}
