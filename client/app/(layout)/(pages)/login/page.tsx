import { Button } from "./Button";
import { getServerSession } from "../../../../lib/getServerSession";
import { redirect } from "next/navigation";
import { siteName } from "../../../../consts";
export default async function Login({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const callback = searchParams?.redirect || "/templates";
  const session = await getServerSession();

  if (session?.user) {
    redirect(callback);
  }
  return (
    <div className="h-full flex justify-center items-center flex-grow">
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold text-3xl">Login to Motionly</p>
        <div className="divider"></div>
        <div className="space-y-2">
          <Button
            service="Google"
            src="/icons/google.png"
            callbackUrl={callback}
          />
          <Button
            service="Github"
            src="/icons/github.png"
            callbackUrl={callback}
          />
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: `Login | ${siteName}`,
};
