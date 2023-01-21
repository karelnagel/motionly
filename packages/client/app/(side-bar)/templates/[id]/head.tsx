import { ComponentProps } from "@asius/components";
import { getTemplate } from "../../../../pages/api/templates/[id]";

export default async function Head({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTemplate({ id });
  if (!template) return null;

  const getFonts = (comps: ComponentProps[]) => {
    return JSON.stringify(comps)
      .match(/fontFamily":"(.*?)"/g)
      ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"));
  };
  const fonts = getFonts(template.comps) || [];
  const css = (font: string) =>
    `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
  return (
    <>
      <title>Asius editor</title>
      {fonts.map((font, i) => (
        <link
          key={i}
          rel="stylesheet"
          href={css(font)}
          {...{ precedence: "default" }}
        />
      ))}
    </>
  );
}
