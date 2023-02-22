import { TranscriptionWord } from "@motionly/base";
import axios from "axios";
import ytdl from "ytdl-core";

export const getYoutubeUrl = async (youtubeUrl: string) => {
  const info = await ytdl.getInfo(youtubeUrl);
  const name = info.videoDetails.title;
  const formats = info.formats.filter(
    (v) => v.container === "mp4" && v.hasVideo && v.hasAudio
  );
  const { url } = formats[0];
  const subtitles = await getSubtitles(info);
  return { url, name, subtitles };
};
const lang = "en";
const format = "srv2";

const getSubtitles = async (
  info: ytdl.videoInfo
): Promise<TranscriptionWord[] | undefined> => {
  const tracks =
    info.player_response.captions?.playerCaptionsTracklistRenderer
      .captionTracks;
  if (tracks && tracks.length) {
    console.log(
      "Found captions for",
      tracks.map((t) => t.name.simpleText).join(", ")
    );
    const track = tracks.find((t) => t.languageCode === lang);
    if (track) {
      console.log("Retrieving captions:", track.name.simpleText);
      console.log("URL", track.baseUrl);
      const output = `${info.videoDetails.title}.${track.languageCode}.${format}`;
      console.log("Saving to", output);
      const result = await axios.get(`${track.baseUrl}&fmt=${format}`);
      // Remplace all html special characters
      const rawString = result.data
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&apos;/g, "'");
      const words: TranscriptionWord[] = rawString
        .split("<text")
        .slice(1)
        .map((w: string) => {
          const start = Number(w.match(/t="(\d+)"/)?.[1]) / 1000;
          const end = start + Number(w.match(/d="(\d+)"/)?.[1]) / 1000;
          const text = w.match(/>(.*?)</)?.[1];
          return { start, end, text };
        })
        .filter((w: TranscriptionWord) => w.text);
      return words;
    } else {
      console.log("Could not find captions for", lang);
    }
  } else {
    console.log("No captions found for this video");
  }
};
