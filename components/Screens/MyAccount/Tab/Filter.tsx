import { ArrowDownSVG } from "@/public/assets/images";
import { useClickOutside } from "@/redux/hook";
import Image from "next/image";
import { useState } from "react";

type Props = {
  filterList: { label: string; value: number }[];
  currentValue: number;
  onChange: (value: number) => void;
  label: string;
  width?: string;
};

const Filter = ({
  filterList,
  currentValue,
  onChange,
  label,
  width,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const currentLabel = filterList.find((item) => item.value === currentValue);
  const handleClick = (value: number) => {
    onChange(value);
    setIsActive(false);
  };

  const { nodeRef } = useClickOutside(() => setIsActive(false));
  return (
    <div className={`filter w-full max-w-[250px] ${width && width}`}>
      <p className="font-medium mb-1">{label}</p>
      <div
        className="relative flex w-full justify-between items-center ps-6 pe-3 bg-[#E5E8ED] py-[7px] cursor-pointer"
        onClick={() => setIsActive(!isActive)}
        ref={nodeRef}
      >
        <span className="font-medium text-sm">
          {currentLabel ? currentLabel.label : ""}
        </span>
        <div>
          <Image src={ArrowDownSVG} alt="Arrow Down"></Image>
        </div>
        <div
          className={`absolute top-full inset-x-0 ${
            isActive ? "block" : "hidden"
          }`}
        >
          {filterList.map((data, index) => (
            <div
              key={index}
              onClick={() => handleClick(data.value)}
              className="flex inset-x-0 justify-between items-center ps-6 pe-3 bg-[#E5E8ED] hover:bg-gray-300 text-sm py-[7px]"
            >
              {data.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
