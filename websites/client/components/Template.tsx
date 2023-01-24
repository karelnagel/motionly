import Link from "next/link";
import Image from "next/image";

export const Template = ({
  name,
  description,
  image,
  id,
  isOwner,
}: {
  name: string;
  description: string;
  image?: string;
  id: string;
  isOwner?: boolean;
}) => {
  return (
    <Link
      className="card bg-base-100 shadow-xl"
      href={`/${isOwner ? "edit" : "templates"}/${id}`}
    >
      <figure className="relative aspect-square">
        {image && (
          <Image
            src={image}
            fill={true}
            alt="template"
            className="object-contain"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{name}</h2>
        <p className="line-clamp-3">{description}</p>
        <div className="card-actions justify-end">
          {/* <div className="badge badge-outline">Fashion</div> */}
        </div>
      </div>
    </Link>
  );
};
