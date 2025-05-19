import React from "react";
import { clsx } from "clsx"; 

type PageTitleProps = {
  title: string;
  id?: string;
  subTitle?: string;
  titleStyle?: string;
  subTitleStyle?: string;
  wrapperStyle?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subTitle,
  titleStyle = "",
  subTitleStyle = "",
  wrapperStyle = "",
  id = "page-title-container",
}) => {
  return (
    <header
      id={id}
      className={clsx(
        "page-head-wrapper px-0 md:px-4 pt-4 mb-4 border-b border-gray-200",
        wrapperStyle
      )}
    >
      <h1
        aria-label="Page title"
        className={clsx("page-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900", titleStyle)}
      >
        {title}
      </h1>
      {subTitle && (
        <p
          aria-label="Page subtitle"
          className={clsx("page-subtitle text-sm text-gray-600 mt-1", subTitleStyle)}
        >
          {subTitle}
        </p>
      )}
    </header>
  );
};

export default PageTitle;

