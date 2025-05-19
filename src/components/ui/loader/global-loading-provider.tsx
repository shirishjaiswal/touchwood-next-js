"use client";

import { ReactNode } from "react";
import { useScreenLoading } from "@/hooks/use-screen-loading";
import IndexLoader from "@/components/ui/loader/index-loader";
import LoaderSpin from "@/components/ui/loader/loader-spin";

export const GlobalLoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isLoading } = useScreenLoading();

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
