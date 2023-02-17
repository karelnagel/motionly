import { useState } from "react";
import { Arrows } from "../../../../components/Arrows";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Bubble } from "../../../../components/Bubble";

export const questions = [
  {
    question: "What is Motionly?",
    answer:
      "Motionly is a video creation platform that allows you to create videos for your business in minutes. You can create videos for your social media, website, and more.",
  },
  {
    question: "How do I get started?",
    answer:
      "You can get started by creating an account and choosing a template. You can then customize the template to fit your needs.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Motionly is free to use. You can create as many videos as you want for free.",
  },
  {
    question: "How do I download my video?",
    answer:
      "You can download your video by clicking the download button in the top right corner of the editor.",
  },
  {
    question: "How do I share my video?",
    answer:
      "You can share your video by clicking the share button in the top right corner of the editor.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can delete your account by clicking the delete account button in the settings page.",
  },
  {
    question: "How do I change my password?",
    answer:
      "You can change your password by clicking the change password button in the settings page.",
  },
];

const Question = ({ question, answer }: (typeof questions)[0]) => {
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

export const FAQ = () => {
  return (
    <div id="faq" className="relative space-y-6 ">
      <p className="text-[50px] md:text-[75px] font-semibold leading-none title">
        Let’s get your
        <br /> questions sorted
      </p>
      <div className="flex gap-7 md:gap-20 flex-col md:flex-row">
        <div className="space-y-6">
          <p className="max-w-lg text-[18px] md:text-[22px] leading-[30px]">
            Most of the questions we get are answered here. If you have any
            questions that aren’t answered here, feel free to contact us.
          </p>
          <Arrows />
        </div>
        <div className="w-full z-20">
          {questions.map((q, i) => (
            <Question key={i} {...q} />
          ))}
        </div>
      </div>
      <Bubble width={20} left={-10} top={85} />
      <Bubble width={4} left={8} top={114} />
      <Bubble width={8} left={8} top={80} />
    </div>
  );
};
