import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { env } from "../../env.mjs";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Motionly";

    return new ImageResponse(
      (
        <div
          style={{
            background: "#171D1C",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <img
              alt="Motionly"
              height={100}
              src={`${env.NEXT_PUBLIC_URL}/motionly.png`}
              width={400}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              fontSize: 80,
              fontStyle: "normal",
              color: "white",
              marginTop: 0,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
