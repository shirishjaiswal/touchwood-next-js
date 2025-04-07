import { TabType } from "@/components/ui/tab/tab-display";
import TabView from "@/components/ui/tab/tab-view";
import EmailTemplates, {
	EmailTemplatesProps,
} from "@/app/home/chat/mail/[...slug]/components/email-templates";
import ClickButton from "@/components/ui/button/click-button";
import Link from "next/link";
import { Add } from "@/components/ui/icons";

const TabList: TabType[] = [
	{
		id: 1,
		key: "private-email-templates",
		label: "Private Templates",
		description: "These templates are private to you.",
		link: "/home/chat/mail/private-email-templates",
		position: 1,
	},
	{
		id: 2,
		key: "default-email-templates",
		label: "Default Configuration",
		description: "These templates are provided by touchwood.",
		link: "/home/chat/mail/default-email-templates",
		position: 2,
	},
	{
		id: 3,
		key: "public-email-templates",
		label: "Public Templates",
		description: "These templates are publically shared.",
		link: "/home/chat/mail/public-email-templates",
		position: 3,
	},
];

type TabDisplayProps = EmailTemplatesProps & {
	activeTabKey: string;
};

function TabDisplay({ content, page, activeTabKey, accessModifiers }: TabDisplayProps) {
	const activeTab = TabList.find((tab) => tab.key === activeTabKey)?.id;
	return (
		<>
			<TabView
				className="sticky top-28 bg-white z-30"
				tabList={TabList}
				activeTab={activeTab || 1}
			/>
			<ClickButton
				id="create-email-template-button"
				variant="shadow-default"
				size="xs"
				className="fixed bottom-6 right-6"
			>
				<Link href="/home/chat/mail/mail-template">
					<div className="flex gap-2  text-white">
						<Add /> <span>Create New Template</span>
					</div>
				</Link>
			</ClickButton>
			<EmailTemplates content={content} page={page} accessModifiers={accessModifiers} />
		</>
	);
}
export default TabDisplay;
