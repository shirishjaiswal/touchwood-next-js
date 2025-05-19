"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";

export interface TabType {
  id: number;
  uniqueKey: string;
  label: string;
  description?: string;
  position: number;
  link: string;
}

export type TabComponentProps = {
  tabData: TabType[];
  activeTab: number;
  onTabChange?: (tabId: number) => void;
  className?: string;
};

function TabView({
  tabData,
  activeTab,
  onTabChange,
  className = "",
}: TabComponentProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortedTabs = useMemo(
    () => [...tabData].sort((a, b) => a.position - b.position),
    [tabData]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        id="desktop-tabs"
        role="tablist"
        aria-orientation="horizontal"
        className={clsx("hidden sm:flex gap-4 border-b", className)}
      >
        {sortedTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.link}
              onClick={() => onTabChange?.(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={clsx(
                "px-4 py-2 text-base font-medium border-b-2 transition-colors",
                {
                  "border-primary-500 text-primary-600": isActive,
                  "border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300":
                    !isActive,
                }
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-dropdown"
        className={clsx("relative sm:hidden", className)}
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full flex justify-between items-center border border-gray-300 bg-white shadow-md rounded-lg p-3 text-gray-700 font-bold"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          {tabData.find((tab) => tab.id === activeTab)?.label || "Select Tab"}
          <span className="ml-2 text-lg">&#9662;</span>
        </button>

        {isDropdownOpen && (
          <ul
            role="listbox"
            aria-activedescendant={`tab-${activeTab}`}
            className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-2 z-10"
          >
            {sortedTabs.map((tab) => (
              <li
                key={tab.id}
                role="option"
                aria-selected={activeTab === tab.id}
                className={clsx({
                  "font-bold text-primary bg-accent-400": activeTab === tab.id,
                })}
              >
                <Link
                  href={tab.link}
                  onClick={() => {
                    onTabChange?.(tab.id);
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
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

export default TabView;
