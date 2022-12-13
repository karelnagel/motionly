import { CompProps } from "@asius/types"
import { audiograms } from "./audiograms"
import { audios } from "./audios"
import { divs } from "./divs"
import { gifs } from "./gifs"
import { graphs } from "./graphs"
import { images } from "./images"
import { lotties } from "./lotties"
import { maps } from "./maps"
import { mockups } from "./mockups"
import { progressbars } from "./progressbars"
import { qrcodes } from "./qrcodes"
import { texts } from "./text"
import { transcriptions } from "./transcriptions"
import { videos } from "./videos"

export const compositions: { [name: string]: CompProps[] } = {
    audiograms, transcriptions, graphs, images, videos, progressbars, texts, qrcodes, audios, divs, maps, mockups, lotties, gifs
}