import React, { PropsWithChildren } from "react";

const RangeSlider: React.FC<
  PropsWithChildren<{ value: number; disabled: boolean }>
> = ({ value, disabled }) => {
  return (
    <input
      type="range"
      id="volume"
      value={value}
      name="volume"
      min="1"
      max="100"
      disabled={disabled}
      className="range racing"
    />
  );
};

export default RangeSlider;
