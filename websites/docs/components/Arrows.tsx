import { IoIosArrowForward } from "react-icons/io";

export const Arrows = () => {
  return (
    <div className="hidden md:flex" >
      {new Array(5).fill(0).map((_, i) => (
        <IoIosArrowForward key={i} className="text-3xl" />
      ))}
    </div>
  );
};
