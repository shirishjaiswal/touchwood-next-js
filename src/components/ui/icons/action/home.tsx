import React from "react";
import { IconProps } from "@/components/ui/icons/types";

type HouseProps = IconProps;

const House: React.FC<HouseProps> = ({
  className,
  color = "#e3e3e3",
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill={color}
    className={className}
    width={width}
    height={height}
  >
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />{" "}
  </svg>
);

export default House;
