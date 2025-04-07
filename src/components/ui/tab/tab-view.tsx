'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface TabType {
  id: number;
  key: string;
  label: string;
  description?: string;
  position: number;
  link: string;
}

export type TabComponentProps = {
  tabList: TabType[];
  activeTab: number;
  onTabChange?: (tabId: number) => void;
  className?: string;
};

function TabView({ tabList, activeTab, onTabChange, className }: TabComponentProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Tab Navigation */}
      <div role="tablist" className={`hidden sm:flex gap-4 border-b ${className}`}>
        {tabList
          .sort((a, b) => a.position - b.position)
          .map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300'
              }`}
            >
              <Link className='no-underline text-base' href={tab.link}>{tab.label}</Link>
            </button>
          ))}
      </div>

      {/* Mobile Dropdown */}
      <div className={`relative sm:hidden m-3 ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full flex justify-between items-center border border-gray-300 bg-white shadow-md rounded-lg p-3 text-gray-700 font-bold"
        >
          {tabList.find((tab) => tab.id === activeTab)?.label || 'Select Tab'}
          <span className="text-lg">&#9662;</span>
        </button>

        {isDropdownOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-2 z-10">
            {tabList.map((tab) => (
              <li key={tab.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link href={tab.link} onClick={() => setIsDropdownOpen(false)}>
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
