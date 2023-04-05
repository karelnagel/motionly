import { FaDiscord } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";
import { Logo } from "../Logo";
import { Subscribe } from "./Subscribe";

const socials = [
  {
    name: "Linkedin",
    href: "/linkedin",
    icon: AiOutlineLinkedin,
  },
  {
    name: "Discord",
    href: "/discord",
    icon: FaDiscord,
  },
  {
    name: "Twitter",
    href: "/twitter",
    icon: BsTwitter,
  },
];
const navLinks = [
  {
    title: "Legal",
    items: [
      {
        name: "Privacy policy",
        href: "/legal/privacy",
      },
      {
        name: "Terms & conditions",
        href: "/legal/terms",
      },
      {
        name: "Cookie policy",
        href: "/legal/cookies",
      },
      {
        name: "Refund policy",
        href: "/legal/refund",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Examples",
        href: "/#examples",
      },
      {
        name: "About",
        href: "/about",
      },
    ],
  },
  {
    title: "Socials",
    items: socials,
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
      },
    ],
  },
];
export const Footer = () => {
  return (
    <div className="flex flex-col relative w-full space-y-7 py-7 px-2 md:px-6 text-center md:text-left mt-auto">
      <div className="relative flex flex-col md:flex-row items-center justify-between">
        <Logo />
        <div className="space-x-2 flex">
          {socials.map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noreferrer" className="bg-base-300 rounded-full aspect-square !p-2">
              <social.icon className="text-2xl" />
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 gap-y-6">
        {navLinks.map((nav, i) => (
          <div key={i} className="space-y-2">
            <h1 className="text-list-title text-[18px] font-semibold">{nav.title}</h1>
            <div className="flex flex-col space-y-1 items-center md:items-start">
              {nav.items.map((item, i) => (
                <a key={i} className="text-[16px] font-normal hover:text-primary duration-200" href={item.href}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        ))}
        <Subscribe />
      </div>
      <div className="w-full h-[1px] bg-base-300" />
      <div className="font-normal text-sm flex flex-col-reverse md:flex-row justify-between">
        <p>Copyright © {new Date().getFullYear()} Motionly. All rights reserved</p>
        <div className="space-x-3">
          <Link href="/legal/terms">Terms & conditions</Link>
          <Link href="/legal/privacy">Privacy policy</Link>
        </div>
      </div>
    </div>
  );
};
