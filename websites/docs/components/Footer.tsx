import Image from "next/image";
import {FaDiscord} from "react-icons/fa";
import {AiOutlineLinkedin} from "react-icons/ai";
import {CgMail} from "react-icons/cg";
import {BsFacebook, BsTwitter, BsInstagram} from "react-icons/bs";
const socialsButtons = [
  {
    icon: <BsFacebook/>,
    link: "https://www.facebook.com/motionlyvideo",
  },
  {
    icon: <BsTwitter/>,
    link: "https://twitter.com/motionlyvideo",
  },
  {
    icon: <BsInstagram/>,
    link: "https://www.instagram.com/motionlyvideo/",
  },
  {
    icon: <CgMail/>,
    link: "mailto:info@motionly.video",
  },
  {
    icon: <AiOutlineLinkedin/>,
    link: "https://www.linkedin.com/company/motionlyvideo/",
  },
  {
    icon: <FaDiscord/>,
    link: "https://discord.gg/6Z2Z5Z7",
  },
];
export const Footer = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center p-3 py-6 space-y-5">
      <Image src="/motionly.jpg" width={300} height={300} alt="logo" />
      <h1 className="title text-2xl font-medium leading-[1.3]">Follow along</h1>
      <div className="flex display-flex space-x-7 md:space-x-3 md:text-2xl font-bold">

        {socialsButtons.map((social, i) => (
          <a
            key={i}
            href={social.link} target="_blank" rel="noreferrer"  >
            <button             
            className="text-3xl rounded-full p-3 px-4 opacity-70 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            transform transition duration-300 ease-in-out hover:opacity-100 hover:scale-125 hover:shadow-lg">
            {social.icon}
            </button>
          </a>
        ))}
        </div>
        <p className="opacity-30">© 2023 Motionly</p>
    </div>
  );
};
