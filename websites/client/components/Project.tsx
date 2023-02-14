import Link from "next/link";
import Image from "next/image";

export const Project = ({
  name,
  description,
  image,
  id,
}: {
  name: string;
  description: string;
  image?: string;
  id: string;
}) => {
  return (
    <Link
      className="card bg-base-200 shadow-xl"
      href={`/templates/${id}`}
    >
      <figure className="relative aspect-square bg-base-300">
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
