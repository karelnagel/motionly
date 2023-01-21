import { getFonts } from "../../../helpers";
import { getTemplate } from "../../../pages/api/templates/[id]";

export default async function Head({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTemplate({ id });
  if (!template) return null;

  const fonts = getFonts(template.comps) || [];
  const css = (font: string) =>
    `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
  return (
    <>
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
