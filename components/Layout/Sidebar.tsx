import { listMenu1, listMenuHelp, listMenuMore } from "@/config/constants";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className=" w-[226px] bg-normal-200 min-h-screen h-full text-white ">
        <div className="flex flex-col pt-[17px] border-[#FFFFFF29] border-b-[1px] ">
          {listMenu1.map((item, ind) => {
            return (
              <Link
                key={ind}
                href={item.href}
                className="pl-[33px] py-[12px] hover:bg-normal-100 duration-500"
              >
                <span className="text-[15px] font-medium leading-normal">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="pt-[15px] border-[#FFFFFF29] border-b-[1px]">
          <p className="text-[15px] pl-[33px] font-medium leading-normal pb-[12px]">
            More
          </p>
          <div className="flex flex-col">
            {listMenuMore.map((item, ind) => {
              return (
                <Link
                  key={ind}
                  href={item.href}
                  className="pl-[33px] py-[12px] hover:bg-normal-100 duration-500"
                >
                  <span className="text-[12px] leading-normal">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="pt-[15px] border-[#FFFFFF29] border-b-[1px]">
          <p className="text-[15px] pl-[33px] font-medium leading-normal pb-[12px]">
            Help
          </p>
          <div className="flex flex-col">
            {listMenuHelp.map((item, ind) => {
              return (
                <Link
                  key={ind}
                  href={item.href}
                  className="pl-[33px] py-[12px] hover:bg-normal-100 duration-500"
                >
                  <span className="text-[12px] leading-normal">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
