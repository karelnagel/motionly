import { Metadata } from "next";

export const siteName = "Motionly";
export const title = "Motionly: Automate your content";
export const description =
  "Motionly is a tool that allows you to create animations for your content. You can create animations for your text, images, videos, and more.";
export const url = "https://motionly.video";
export const logo = `${url}/logo.png`;
export const motionly = `${url}/motionly.png`;
export const favicon = `${url}/favicon.png`;
export const subTitle = (sub?: string) =>
  sub ? `${sub} | ${siteName}` : title;
export const email = "info@motionly.video";
type MetaInput = {
  title?: string;
  description?: string;
  image?: string;
};
export const meta = ({ title, description, image }: MetaInput): Metadata => ({
  title: subTitle(title),
  description,
  openGraph: {
    title: subTitle(title),
    description,
    images: [
      {
        url: image || motionly,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
});

declare global {
  var title: string;
  var description: string;
  var url: string;
  var siteName: string;
  var meta: (p: MetaInput) => Metadata;
}
global.title = siteName;
global.description = description;
global.url = url;
global.siteName = siteName;
global.meta = meta;
