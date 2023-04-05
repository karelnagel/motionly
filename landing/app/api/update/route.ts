import { NextRequest, NextResponse } from "next/server";
import { release } from "~/config";

export const runtime = "experimental-edge";

const getSig = async (url: string) => {
  const res = await fetch(`${url}.sig`);
  const sig = await res.text();
  return sig;
};
const getVersion = async () => {
  const res = await fetch(`${release}/download/latest.json`);
  const version = (await res.json()).version;
  return version;
};

export async function GET(req: NextRequest) {
  const version = await getVersion();
  const macUrl = `${release}/download/motionly_universal.app.tar.gz`;
  const winUrl = `${release}/download/motionly_${version}_x64_en-US.msi.zip`;
  const linuxUrl = `${release}/download/motionly_${version}_amd64.AppImage.tar.gz`;
  const macSig = await getSig(macUrl);
  const winSig = await getSig(winUrl);
  const linuxSig = await getSig(linuxUrl);
  const platforms = {
    "windows-x86_64": {
      url: winUrl,
      signature: winSig,
    },
    "linux-x86_64": {
      url: linuxUrl,
      signature: linuxSig,
    },
    "darwin-aarch64": {
      url: macUrl,
      signature: macSig,
    },
    "darwin-x86_64": {
      url: macUrl,
      signature: macSig,
    },
  };
  return NextResponse.json(
    { version, platforms },
    {
      headers: { "Cache-Control": "s-maxage=3600, public" },
    }
  );
}
