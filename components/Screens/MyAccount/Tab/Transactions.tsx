import { useState } from "react";
import Image from "next/image";

import { CheckBoxSVG } from "@/public/assets/images";
import { CheckIcon } from "@/components/Common/Icons";
import Filter from "./Filter";

const Transactions = () => {
  const dateRange = [
    { label: "Last 7 days", value: 2 },
    { label: "Last 14 days", value: 5 },
    { label: "Last 30 days", value: 4 },
  ];

  const status = [
    { label: "All", value: 2 },
    { label: "Deposit", value: 5 },
    { label: "Lost", value: 4 },
    { label: "Pending", value: 3 },
    { label: "Withdrawal", value: 1 },
    { label: "Won", value: 6 },
    { label: "Free Entries", value: 7 },

  ];

  const [filterDate, setFilterDate] = useState(2);
  const [filterStatus, setFilterStatus] = useState(1);

  const handleChangeFilterDate = (value: number) => {
    setFilterDate(value);
  };
  const handleChangeFilterStatus = (value: number) => {
    setFilterStatus(value);
  };

  return (
    <>
      <div className="ms-4">
        <div className="rounded-[7px] border border-black/40 flex overflow-hidden">
          <p className="py-5 ps-8 text-normal-100 text-[20px] font-bold flex-1">
            Total Winnings
            <span className="block pt-2 text-black font-extrabold ">
              $2,004
            </span>
          </p>
          <div
            className="relative max-w-[177px] w-full bg-orange-200 flex justify-center items-end flex-col gap-y-1 pe-[26px] "
            style={{
              clipPath:
                "polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)",
            }}
          >
            {/* <div className="absolute inset-y-0 left-0 bg-white max-w-[80px] w-full"
            style={{clipPath: polygon(0% 0%, 74% 0, 100% 50%, 70% 100%, 0% 100%);}}
          ></div> */}
            <span className="flex gap-x-2 py-[3px] text-[10px] px-[14px] items-center justify-center bg-white text-normal-100 rounded-[5px] cursor-pointer">
              <CheckIcon /> My Entries
            </span>
            <span className="flex gap-x-2 py-[3px] text-[10px] px-[14px] items-center justify-center bg-white text-normal-100 rounded-[5px] cursor-pointer">
              <CheckIcon /> Upcoming
            </span>
          </div>
        </div>
        <div className="flex mt-[15px] gap-x-[42px]">
          <Filter
            label="Date Range"
            filterList={dateRange}
            currentValue={filterDate}
            onChange={handleChangeFilterDate}
          />
          <Filter
            label="Transaction Types"
            filterList={status}
            currentValue={filterStatus}
            onChange={handleChangeFilterStatus}
            width={"max-w-[293px]"}
          />
        </div>
        <div className="my-5  text-[12px] font-medium leading-[15px]">
          <p>10 Transactions Page 1 2 </p>
          <p>01Aug2023 - 07Aug2023</p>
        </div>
        <div className="">
          <p className="px-4 py-2 bg-gray-950 text-[11px]">Tuesday 01 Aug</p>
          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>15:15 00 AEST</p>
              <p>Debit Crecit Card (************5095)</p>
            </div>
            <span className="text-[10px]">+ $50.00</span>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>15:15 00 AEST</p>
              <p>Debit Crecit Card (************5095)</p>
            </div>
            <span className="text-[10px]">+ $100.00</span>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px] text-success-100 flex gap-x-1">
              + $15.65 <Image src={CheckBoxSVG} alt={"Checked Icon"} />
            </span>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00 + Late Change: $15</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px] text-gray-1000">No Return</span>
          </div>
        </div>
        <div className="">
          <p className="px-4 py-2 bg-gray-950 text-[11px]">Wednesday 02 Aug</p>

          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00 + Late Change: $15</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px]">- $65.00</span>
          </div>
        </div>
        <div className="">
          <p className="px-4 py-2 bg-gray-950 text-[11px]">Friday 04 Aug</p>

          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px]">- $50.00</span>
          </div>
        </div>
        <div className="">
          <p className="px-4 py-2 bg-gray-950 text-[11px]"> Saturday 05 Aug</p>

          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px] text-success-100 flex gap-x-1">
              + $15.65 <Image src={CheckBoxSVG} alt={"Checked Icon"} />
            </span>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="px-5 py-[10px] flex justify-between items-center">
            <div className="text-[11px] leading-[13px]">
              <p>12 Leg Mixed Metro Challenge</p>
              <p>Buy In: $50.00 + Late Change: $15</p>
              <p>Entry No: 40238912 @ 14:44pm AEST</p>
              <p>Comp No: 1902812</p>
            </div>
            <span className="text-[10px] text-gray-1000">No Return</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
