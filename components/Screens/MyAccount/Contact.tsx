import { EmailIcon, MessageIcon, MouseIcon } from "@/public/assets/images";
import Image from "next/image";
import Link from "next/link";
const Contact = () => {
  return (
    <div className="mb-4 p-4 bg-[#F0F1F2] space-y-5 ">
      <p className="text-[16px] font-medium">Contact</p>
      <div className="flex gap-x-3 text-[11px]">
        <Image src={MessageIcon} alt="Message Icon" />
        <Link href="#!" className="text-blue-800 ">
          Live Chat
        </Link>
      </div>
      <div className="flex gap-x-3 text-[11px]">
        <Image src={EmailIcon} alt="Email Icon" />
        <Link href="#!" className="text-blue-800 ">
          Email Us
        </Link>
      </div>
      <div className="flex gap-x-3 text-[11px]">
        <Image src={MouseIcon} alt="Phone Icon" className="self-start" />
        <p className="text-primary-400">
          Bet Live &nbsp;
          <span className="text-[#111111]">13 BETS (13 2387)</span>
          <br />
          Customer Service <span className="text-[#111111]">1800 990 907</span>
        </p>
      </div>
      <div className="flex gap-x-3 text-[11px]">
        <Image src={MouseIcon} alt="Mouse Icon" />
        <Link href="#!" className="text-blue-800 ">
          See more at our Help Centre
        </Link>
      </div>
    </div>
  );
};

export default Contact;
