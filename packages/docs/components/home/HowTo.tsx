import Image from "next/image";

export const HowTo = () => {
  return (
    <div className="items-center flex flex-col space-y-14 py-14 ">
      <p className="text-5xl font-bold title  my-14">
        Add a dynamic video to your site
      </p>
      <div className="space-y-6 max-w-screen-lg">
        <Item
          image="/editor.jpg"
          title="1. Drag"
          text=" Using our easy to use drag and drop editor, create a video that
            you'd like to show on your website."
        />
        <Item
          image="/copy.jpg"
          title="2. Copy"
          text="Copy the JSON (or the video id) from the editor."
        />
        <Item
          image="/view.jpg"
          title="3. Integrate"
          text="Using our @asius/player and @asius/sdk (for rendering) add the json to your website. View more in the docs."
        />
      </div>
      <div className=" h-1 w-full bg-gradient-to-l from-pink-500 to-blue-600 rounded-lg" />
    </div>
  );
};

const Item = ({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 h-80 w-full">
      <div className="space-y-4">
        <p className="text-4xl font-semibold">{title}</p>
        <p className="text-2xl">{text}</p>
      </div>
      <div className="relative">
        <Image
          src={image}
          layout="fill"
          alt="drag"
          className="object-contain"
        />
      </div>
    </div>
  );
};
