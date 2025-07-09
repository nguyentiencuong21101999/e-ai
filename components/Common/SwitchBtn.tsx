import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const SwitchBtn: React.FC<
  PropsWithChildren<{ value: boolean; onChange: () => void; rounded: boolean }>
> = ({ value, onChange, rounded }) => {
  return (
    <label className="my-switch relative inline-flex w-[57px] h-[22px]">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="w-0 h-0"
      />
      <span
        className={`slider absolute inset-0 cursor-pointer bg-[#ccc] duration-[.4s] ${
          rounded ? "rounded" : ""
        }`}
      ></span>
    </label>
  );
};

export default SwitchBtn;
