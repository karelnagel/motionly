import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const ShowHide = ({
  show,
  setShow,
  className,
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  className?: string;
}) => {
  return (
    <button className={className} onClick={() => setShow(!show)}>
      {!show ? <IoIosArrowDown /> : <IoIosArrowUp />}
    </button>
  );
};
