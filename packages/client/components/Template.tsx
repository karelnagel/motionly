import Link from "next/link";
import Image from "next/image";

export const Template = ({
  name,
  image,
  id,
}: {
  name: string;
  image?: string;
  id: string;
}) => {
  return (
    <Link className="flex flex-col space-y-1" href={`/templates/${id}`}>
      <div className="aspect-square relative bg-base-200 rounded-lg overflow-hidden">
        {image && (
          <Image
            src={image}
            fill={true}
            alt="template"
            className="object-contain"
          />
        )}
      </div>
      <p className="font-bold">{name}</p>
    </Link>
  );
};
