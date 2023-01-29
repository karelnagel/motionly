import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
const navLinks = [
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
    title: "Legal",
    items: [
      {
        name: "Privacy Policy",
        href: "/privacy",
      },
      {
        name: "Terms and Conditions",
        href: "/terms",
      },
      {
        name: "Cookie Policy",
        href: "/cookies",
      },
      {
        name: "Refund Policy",
        href: "/refundpolicy",
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
  {
    title: "Follow us",
    items: [
      {
        name: "Linkedin",
        href: "https://www.linkedin.com/company/motionlyvideo/",
      },
      {
        name: "Discord",
        href: "https://discord.gg/6Z2Z5Z7",
      }/*
      {
        name: "Instagram",
        href: "",
      },
      {
        name: "Facebook",
        href: "",
      }
      */
    ]
  },
]
export const Footer = () => {
  const router = useRouter();
  return (

    <div className="relative w-full pt-4 pb-12">
      <div className="max-w-screen-xl grid gap-2 grid-cols-2 md:grid-cols-6 space-y-12 md:space-y-6 text-center md:text-left">
        <div className="col-span-2 flex flex-col items-center text-center max-w-xd  md:max-w-md space-y-3">
          <Image src="/motionly.gif" width={150} height={150} alt="logo" />
          <a className="text-[#8f8f8f]  font-normal"
            href="mailto:info@motionly.video">info@motionly.video</a>
          <p className="col-span-2 font-normal text-xl text-[#8f8f8f]">© 2023 Motionly. All rights reserved.</p>
        </div>
        {navLinks.map((nav, i) => (
          <div key={i} className="flex flex-col space-y-8 md:space">
            <h1 className=" text-[25px] font-medium">{nav.title}</h1>
            <div className="flex flex-col space-y-2">
              {nav.items.map((item, i) => (
                <Link key={i} className="text-[#8f8f8f] text-[20px] font-medium hover:scale-105 duration-200" href={item.href} > {item.name}</Link>
              ))}
            </div>
          </div>))}
      </div>
    </div>
  );
};
