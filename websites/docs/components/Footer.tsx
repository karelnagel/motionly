import Image from "next/image";

export const Footer = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center p-3 py-6 space-y-5">
      <p>info@motionly.video</p>
      <Image src="/motionly.jpg" width={300} height={300} alt="logo" />
    </div>
  );
};
