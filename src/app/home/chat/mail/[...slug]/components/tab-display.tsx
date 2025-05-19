import Link from "next/link";
import { Add } from "@/components/ui/icons";
import ClickButton from "@/components/ui/button/click-button";
import TabView, { TabType } from "@/components/ui/tab/tab-view";

const TabList: TabType[] = [
  {
    id: 1,
    uniqueKey: "private-email-templates",
    label: "Private Templates",
    description: "These templates are private to you.",
    link: "/home/chat/mail/private-email-templates",
    position: 1,
  },
  {
    id: 2,
    uniqueKey: "default-email-templates",
    label: "Default Configuration",
    description: "These templates are provided by touchwood.",
    link: "/home/chat/mail/default-email-templates",
    position: 2,
  },
  {
    id: 3,
    uniqueKey: "public-email-templates",
    label: "Public Templates",
    description: "These templates are publically shared.",
    link: "/home/chat/mail/public-email-templates",
    position: 3,
  },
];

type TabDisplayProps = {
  activeTabKey: string;
};

function TabDisplay({ activeTabKey }: TabDisplayProps) {
  const activeTab = TabList.find((tab) => tab.uniqueKey === activeTabKey)?.id;
  return <TabView tabData={TabList} activeTab={activeTab || 1} />;
}
export default TabDisplay;
