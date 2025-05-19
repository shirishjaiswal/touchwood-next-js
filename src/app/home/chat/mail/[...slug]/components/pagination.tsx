"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	path: string;
}

function Pagination({ currentPage, totalPages, path }: PaginationProps) {
	const [pageNumbers, setPageNumbers] = useState<number[]>([]);
	const router = useRouter();

	const handlePageChange = (page: number) => {
		router.push(`/home/chat/mail/${path}/${page - 1}`);
	};

	useEffect(() => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		setPageNumbers(pages);
	}, [totalPages]);

	return (
		<div className="flex py-4 w-full">
			<div className="flex items-center gap-2 px-4 py-2">
				<ClickButton
					id="previous-page-button"
					variant="outline-default"
					size="xs"
					disabled={currentPage === 0}
					onClick={() => currentPage > 0 && handlePageChange(currentPage)}
					className="disabled:opacity-50 disabled:cursor-not-allowed border-none"
				>
					<ArrowLeftIcon />
				</ClickButton>

				{pageNumbers.map((page) => (
					<ClickButton
						id={`page-button-${page}`}
						key={page}
						variant={page === currentPage + 1 ? "shadow-green" : "outline-default"}
						size="xs"
						className={`min-w-[2.5rem] justify-center rounded-md transition-all duration-200 ${
							page === currentPage + 1
								? "text-white bg-green-600 hover:bg-green-700"
								: "hover:bg-gray-100"
						}`}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</ClickButton>
				))}

				<ClickButton
					id="next-page-button"
					variant="outline-default"
					size="xs"
					disabled={currentPage + 1 === totalPages}
					onClick={() => currentPage + 1 < totalPages && handlePageChange(currentPage + 2)}
					className="disabled:opacity-50 disabled:cursor-not-allowed border-none "
				>
					<ArrowRight />
				</ClickButton>
			</div>
		</div>
	);
}

export default Pagination;
