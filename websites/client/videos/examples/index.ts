import { TemplateType } from "@motionly/base";
import { podcasts } from "./podcasts";
import { tweets } from "./tweets";
import { subtitles } from "./subtitles";
import { yir } from "./yir";
import { mockups } from "./mockups";
import { interactive } from "./interactive";
import { main } from "./main";
import { phone } from "./phone";

export const examples: { [key: string]: TemplateType } = {
  mockups,
  podcasts,
  yir,
  subtitles,
  tweets,
  phone,
  main,
  interactive: interactive({
    name: "Steve Jobs",
    birthday: "2023-01-06",
    color: "#2F9AD6",
  }),
};
