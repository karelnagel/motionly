import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const Arrows = ({ direction }: { direction: string }) => {
  return (
    <div className="hidden md:flex">
      {new Array(5)
        .fill(0)
        .map((_, i) =>
          direction === "left" ? (
            <IoIosArrowBack key={i} className="text-3xl" />
          ) : (
            <IoIosArrowForward key={i} className="text-3xl" />
          )
        )}
    </div>
  );
};
