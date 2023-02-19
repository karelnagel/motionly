import { description, title, url } from "../consts";

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Programmatic videos" />
      <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content="https://motionly.video/api/og" /> */}
      <meta property="og:image" content={url + "/logo.png"} />
    </>
  );
}
