import { Clone } from "./Clone";

export const Title = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col text-center md:flex-row space-y-4 md:space-y-0 justify-between items-center my-10">
      <p className="text-5xl font-bold title">{text}</p>
      <Clone className="btn">create new</Clone>
    </div>
  );
};
