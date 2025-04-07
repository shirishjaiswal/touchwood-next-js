'use client'
import { useParams, usePathname } from 'next/navigation'
import React from 'react';
import Tab from '@/components/ui/tab/tab'; // Ensure Tab is a valid React component
import GroupListContent, { TabContentGroupType } from './components/group-list-content';
import TabGroupButtons from './components/tab-group-buttons';
import { link } from 'fs';

const emptyTabList = [];
const tabs = [
  {
    id: 1,
    key: "home",
    label: "Home Tab",
    description: "Welcome to the home section.",
    link: "/home/configuration/profile/home",
    position: 3
  },
  {
    id: 2,
    key: "about",
    label: "About Tab",
    description: "Learn more about us here.",
    link: "/home/configuration/profile/about",
    position: 4
  },
  {
    id: 3,
    key: "services",
    label: "Services Tab",
    description: "Explore the services we offer.",
    link: "/home/configuration/profile/services",
    position: 1
  },
  {
    id: 4,
    key: "contact",
    label: "Contact Tab",
    description: "Get in touch with us.",
    link: "/home/configuration/profile/contact",
    position: 2
  }
];

const tabContentGroups: TabContentGroupType[] = [
  {
    id: 1,
    tabId: 1, // Linked to "Home Tab"
    key: "group_1",
    label: "General Information",
    description: "Basic details about the product.",
    labelVisible: true,
    descriptionVisible: true,
    multiple: false,
    required: true,
    parent: [
      {
        id: 101,
        key: "title",
        inputType: "text",
        label: "Product Name",
        description: "Enter the name of the product.",
        value: ["Smartphone X200"],
        labelVisible: true,
        required: true,
      },
      {
        id: 102,
        key: "category",
        inputType: "select",
        label: "Category",
        description: "Choose a product category.",
        value: ["Smartphones"],
        labelVisible: true,
        required: true,
      },
    ],
  },
  {
    id: 2,
    tabId: 3, // Linked to "Services Tab"
    key: "group_2",
    label: "Specifications",
    description: "Technical specifications of the product.",
    labelVisible: true,
    descriptionVisible: false,
    multiple: true,
    required: false,
    parent: [
      {
        id: 201,
        key: "color",
        inputType: "radio",
        label: "Available Colors",
        description: "Choose a color variant.",
        value: ["Black", "White", "Blue"],
        labelVisible: true,
        required: false,
      },
      {
        id: 202,
        key: "size",
        inputType: "checkbox",
        label: "Available Sizes",
        description: "Select the available sizes.",
        value: ["64GB", "128GB", "256GB"],
        labelVisible: true,
        required: false,
      },
    ],
  },
  {
    id: 3,
    tabId: 4, // Linked to "Contact Tab"
    key: "group_3",
    label: "Pricing & Availability",
    description: "Pricing details and stock availability.",
    labelVisible: true,
    descriptionVisible: true,
    multiple: false,
    required: false,
    parent: [
    ],
  },
];


function Page() {
  const { slug } = useParams();
  const activeTabId = tabs.find((tab) => tab.key === slug?.[0])?.id || 1;
  // useEffect(() => {
  //   async function fetchData() {
  //     await fetchConfigUserDetails(slug as string);
  //   }
  //   fetchData();
  // }, [slug]);
  // fetch the navigation data
  const pathname = usePathname()
  const title = pathname.split("/")[3];
  return (
    <>
      <div className="sticky top-16 bg-white pb-2 px-2 gap-4">
        <h1 className="font-bold text-2xl uppercase mb-2">{title + ' Configuration'}</h1>
        <Tab tabList={tabs} activeTab={activeTabId} />
        <TabGroupButtons activeTabId={activeTabId} />
      </div>
      <div className='p-2'>
        <GroupListContent
          groupListContent={tabContentGroups.filter((group) => group.tabId === activeTabId) ?? null}
        />
      </div>
    </>
  );
}
export default Page