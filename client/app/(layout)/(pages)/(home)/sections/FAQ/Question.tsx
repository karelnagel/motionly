"use client";

import { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full py-4 border-t border-opacity-50 border-base-content space-y-3">
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between cursor-pointer w-full "
      >
        <p className="font-medium text-[18px] md:text-[22px]">{question}</p>
        <button className="text-3xl leading-none">
          {show ? <IoIosRemove /> : <IoIosAdd />}
        </button>
      </div>
      {show && <div className="text-[16px] md:text-[18px]">{answer}</div>}
    </div>
  );
};
