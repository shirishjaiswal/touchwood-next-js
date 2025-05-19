"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface PaginationProps {
	currentPage: number; 
	totalPages: number;
	path: string;
}

function Pagination({ currentPage, totalPages, path }: PaginationProps) {
	const router = useRouter();

	const handlePageChange = (page: number) => {
		router.push(`/home/chat/mail/${path}/${page - 1}`);
	};

	const visiblePages = useMemo(() => {
		const maxVisible = 5;
		let start = Math.max(1, currentPage + 1 - Math.floor(maxVisible / 2));
		let end = start + maxVisible - 1;

		if (end > totalPages) {
			end = totalPages;
			start = Math.max(1, end - maxVisible + 1);
		}

		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	}, [currentPage, totalPages]);

	return (
		<div className="flex py-4 w-full">
			<div className="flex items-center gap-2 px-4 py-2">
				{currentPage > 0 && (
					<ClickButton
						id="previous-page-button"
						variant="none"
						size="none"
						onClick={() => handlePageChange(currentPage)}
						className="border-none px-0 py-0 p-0"
					>
						<ArrowLeftIcon />
					</ClickButton>
				)}

				{visiblePages.map((page) => (
					<ClickButton
						id={`page-button-${page}`}
						key={page}
						variant={page === currentPage + 1 ? "shadow-green" : "outline-default"}
						size="none"
						className={`justify-center rounded-md transition-all duration-200 px-3 py-1.5 ${
							page === currentPage + 1
								? "text-white bg-green-600 hover:bg-green-700"
								: "hover:bg-gray-100"
						}`}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</ClickButton>
				))}

				{/* Conditionally render Next button */}
				{currentPage + 1 < totalPages && (
					<ClickButton
						id="next-page-button"
						variant="none"
						size="none"
						onClick={() => handlePageChange(currentPage + 2)}
						className="border-none"
					>
						<ArrowRight />
					</ClickButton>
				)}
			</div>
		</div>
	);
}

export default Pagination;
