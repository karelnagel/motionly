import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { useRouter } from "next/router";
import logo from "../public/motionly.png";

import Link from "next/link";
import { Button } from "./Button";

const socialsButtons = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/motionlyvideo/",
    icon: <AiOutlineLinkedin className="" />,
  },
  {
    name: "Discord",
    href: "https://discord.gg/6Z2Z5Z7",
    icon: <FaDiscord className="" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/motionlyvideo",
    icon: <BsTwitter className=" " />,
  },
]
const navLinks = [
  {
    title: "Legal",
    items: [
      {
        name: "Privacy policy",
        href: "/privacy",
      },
      {
        name: "Terms & conditions",
        href: "/terms",
      },
      {
        name: "Cookie policy",
        href: "/cookies",
      },
      {
        name: "Refund policy",
        href: "/refundpolicy",
      }],
  },
  {
    title: "Product",
    items: [{
      name: "Demo",
      href: "/",
    },
    {
      name: "Examples",
      href: "/features",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "About",
      href: "/about",
    }
    ],
  },
  {
    title: "Socials",
    items: [{
      name: "Linkedin",
      href: "https://www.linkedin.com/company/motionlyvideo/",
    },
    {
      name: "Discord",
      href: "https://discord.gg/6Z2Z5Z7",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/motionlyvideo",
    }]
  },
  {
    title: "Help",
    items: [
      {
        name: "FAQ",
        href: "/#faq",
      },
      {
        name: "Blog",
        href: "/blog",
      },
      {
        name: "Docs",
        href: "/docs",
      }]
  },
]
export const Footer = () => {
  const router = useRouter();
  return (

    <div className="flex flex-col relative w-full">
      <div className=" h-[6px] w-full bg-primary mt-14" />
      <div className=" max-w-screen-xl  my-8">
        <div className="relative flex flex-col items-center md:flex-row md:justify-between mx-10 space-y-8 md:space-y-0 md:mr-44">
          <Image src={logo} width={300} height={100} alt="logo" />
          <div className="space-x-4">
            {socialsButtons.map((social, i) => (
              <a
                key={i}
                href={social.href} target="_blank" rel="noreferrer"  >
                <button
                  className="text-3xl rounded-full p-2 px-2 opacity-80 gradient
            transform transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 hover:shadow-lg">
                  {social.icon}
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className=" top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-secondary" />
      <div className="relative max-w-screen-xl grid gap-2 grid-cols-3 md:grid-cols-6 space-y-12 md:space-y-12 space-x-6 md:space-x-32 text-center md:text-left mx-4 md:mx-12">
        {navLinks.map((nav, i) => (
          <div key={i} className="flex flex-col text-left items-center md:items-baseline md:max-w-[140px] space-y-4 md:space">
            <div>
              <h1 className=" title text-[18px] font-semib">{nav.title}</h1>
              <div className="w-6 h-[2px] bg-gradient-to-r from-primary to-secondary" />
            </div>
            <div className="flex flex-col space-y-2">
              {nav.items.map((item, i) => (
                <Link key={i} className="text-[#8f8f8f] text-[16px] font-normal hover:scale-105 duration-200" href={item.href} > {item.name}</Link>
              ))}
            </div>
          </div>))}
        <div className="col-span-2 ">
          <div className="flex flex-col items-center md:items-baseline md:flex md:flex-col space-y-4 md:space max-w-[250px]">
            <div className="flex flex-col md:flex md items-left md:items-left ">
              <h1 className=" title text-[18px] font-normal">Subscribe</h1>
              <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-secondary" />
            </div>
            <div className=" flex-col space-y-2 ">
              <input className="formbox rounded-md p-1" type="email" placeholder="Enter your email" />
              <button className="rounded-full p-2  items-center  text-sm btn-gradient hover:scale-105 duration-300">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className=" top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-secondary" />
        <div className="md:flex md:justify-between mx-4 md:mx-12 my-5 ">
          <div className="md:flex md:flex-row space-x-3">
            <p className="font-normal text-sm text-[#8f8f8f]">Copyright © 2023 Motionly.</p>
            <p className="font-semibold text-sm text-[#8f8f8f]">All rights reserved</p>
          </div>
          <div className="md:flex md:flex-row space-x-3">
            <a href="/terms" className="font-normal text-sm text-[#8f8f8f]">Terms & conditions</a>
            <a href="/cookies" className="font-normal text-sm text-[#8f8f8f]">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
