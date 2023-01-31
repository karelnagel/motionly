import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const Arrows = ({ direction }: { direction: string }) => {
  return (

    <div className="hidden md:flex" >
      {direction === "left" ?
        new Array(5).fill(0).map((_, i) => (
          <IoIosArrowBack key={i} className="text-3xl" />
        )) :
        new Array(5).fill(0).map((_, i) => (
          <IoIosArrowForward key={i} className="text-3xl" />
        ))}

    </div>
  );
};
