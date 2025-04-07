"use client";

import { ReactNode } from "react";
import { useGlobalLoading } from "@/hooks/use-global-loading";
import IndexLoader from "@/components/ui/loader/index-loader";
import LoaderSpin from "@/components/ui/loader/loader-spin";

export const GlobalLoadingProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { isLoading } = useGlobalLoading();

	return (
		<>
			{isLoading && (
				<IndexLoader>
					<LoaderSpin width={150} height={150} color="#078BA0" />
				</IndexLoader>
			)}
			{children}
		</>
	);
};
