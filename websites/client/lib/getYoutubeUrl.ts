import ytdl from "ytdl-core";

export const getYoutubeUrl = async (youtubeUrl: string) => {
  const info = await ytdl.getInfo(youtubeUrl);
  const name = info.videoDetails.title;
  const formats = info.formats.filter(
    (v) => v.container === "mp4" && v.hasVideo && v.hasAudio
  );
  const { url } = formats[0];
  return { url, name };
};
