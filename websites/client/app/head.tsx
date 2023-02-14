export default function Head() {
  return (
    <>
      <title>Motionly</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Programmatic videos" />
      <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      <meta property="og:url" content={`https://motionly.video/`} />
      <meta property="og:title" content={"Motionly"} />
      <meta property="og:description" content={"Automate your content"} />
      <meta property="og:image" content="https://motionly.video/api/og" />
      <meta property="og:image" content={"/logo.png"} />
    </>
  );
}
