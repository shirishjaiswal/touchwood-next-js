import React from "react";
import { IconProps } from "@/components/ui/icons/types";

type RunProps = IconProps;

const Run: React.FC<RunProps> = ({
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
		<path d="M240-240v-480h80v480h-80Zm160 0 400-240-400-240v480Zm80-141v-198l165 99-165 99Zm0-99Z" />
	</svg>
);

export default Run;
