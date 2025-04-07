"use client";

import ClickButton from "@/components/ui/button/click-button";
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
		router.push(`/home/chat/mail/${path}/${page-1}`);
	};
	useEffect(() => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		setPageNumbers(pages);
	}, [totalPages]);
	return (
		<div className="my-6 flex justify-start w-10/12">
			<div className="flex items-center gap-2">
				<ClickButton
          id="previous-page-button"
					variant="shadow-default"
					size="xs"
					disabled={currentPage === 0}
				>
					<span>Previous</span>
				</ClickButton>

				{pageNumbers.map((page) => (
					<ClickButton
            id={`page-button-${page}`}
						key={page}
						variant={page === currentPage +1 ? "shadow-green" : "outline-default"}
						size="xs"
						className={`min-w-[2.5rem] justify-center ${
							page === currentPage+1 ? "text-white" : ""
						}`}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</ClickButton>
				))}

				<ClickButton
          id="next-page-button"
					variant="shadow-default"
					size="xs"
					disabled={currentPage === totalPages}
				>
					<span>Next</span>
				</ClickButton>
			</div>
		</div>
	);
}

export default Pagination;
