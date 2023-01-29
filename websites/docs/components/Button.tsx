import { type } from "os";
import { IoIosArrowForward } from "react-icons/io";

export const Button = ({
  className,
  text,
  submit
}: {
  className?: string;
  text?: string;
  submit?: boolean;
}) => {
  return (
      <button type={submit ? "submit" : undefined} className={`flex rounded-full  items-center font-semibold text-2xl btn-gradient hover:scale-110 duration-300 ${className}`} >
        {text}<IoIosArrowForward className="pb-0 font-normal text-4xl" />
      </button>
  );
};
