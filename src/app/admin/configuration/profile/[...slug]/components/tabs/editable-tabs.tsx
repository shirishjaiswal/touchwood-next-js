"use client";
import Link from "next/link";
import { useState } from "react";
import EditTabPopup from "@/app/admin/configuration/profile/[...slug]/components/tabs/edit-tab-popup";
import AddTabPopup from "@/app/admin/configuration/profile/[...slug]/components/tabs/add-new-tab-popup";
import { FormDataTab_Read } from "@/lib/types/form-data/tab";

export type EditableTabsProps = {
  tabList: FormDataTab_Read[];
  activeTab: number;
};

function EditableTabs({ tabList, activeTab }: EditableTabsProps) {
  const [isMobileViewTabsDropdownOpen, setMobileViewTabsDropdownOpen] =
    useState<boolean>(false);

  const sortedTabs = [...tabList].sort((a, b) => a.position - b.position);
  const activeTabData = sortedTabs.find((tab) => tab.id === activeTab);

  return (
    <>
      {/* Desktop View */}
      <div
        id="user-details"
        className="tab-list hidden sm:flex w-full gap-4 sticky top-20 bg-white z-10"
      >
        {sortedTabs.map((tab) => (
          <div key={tab.id}>
            <div
              className={`user-details--tab__container group ${
                activeTab === tab.id
                  ? "border-b-2 border-primary-500 text-primary-600"
                  : "text-gray-500 hover:text-primary-500"
              }`}
            >
              <Link href={`/admin/configuration/profile/${tab.uniqueKey}`} className="user-details--tab__link">
                <h1 className="user-details--tab__title">{tab.label}</h1>
              </Link>
              {activeTab === tab.id && <EditTabPopup tab={tab} />}
            </div>
          </div>
        ))}
        <AddTabPopup length={tabList.length} />
      </div>

      {/* Mobile View (Dropdown) */}
      <div className="w-full flex sm:hidden sticky top-20">
        <div
          className="relative flex items-center border border-gray-300 bg-white shadow-md rounded-lg p-3 cursor-pointer w-full"
          onClick={() =>
            setMobileViewTabsDropdownOpen(!isMobileViewTabsDropdownOpen)
          }
        >
          <span className="text-gray-700 text-lg font-bold w-full">
            {activeTabData?.label || "Select Tab"}
          </span>
          {activeTabData && (
            <EditTabPopup
              tab={activeTabData}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            />
          )}
        </div>
        {isMobileViewTabsDropdownOpen && (
          <ul className="absolute left-0 mt-14 w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-10">
            {sortedTabs.map((tab) => (
              <li
                key={tab.id}
                className="px-4 py-2 text-gray-900 bg-white hover:bg-gray-200 cursor-pointer font-medium"
              >
                <Link href={`/admin/configuration/profile/${tab.uniqueKey}`}>
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default EditableTabs;
