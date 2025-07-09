import React, { FC, ReactNode, useRef } from "react";

type PopoverProps = {
  isOpen: boolean;
  content: ReactNode;
  topValue?: string;
  leftValue?: string;
};

const Popover: FC<PopoverProps> = ({
  isOpen,
  content,
  topValue,
  leftValue,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-[9999] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] rounded-[6px] flex flex-col  top-[${topValue}] left-[${leftValue}]`}
      style={{ top: topValue, left: leftValue }}
      ref={popoverRef}
    >
      {content}
    </div>
  );
};

export default Popover;
