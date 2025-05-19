import TabView from "@/components/ui/tab/tab-view";
import AccountSettingsTabs from "./components/tab-data";

function SettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TabView tabList={AccountSettingsTabs} activeTab={1} />
			{children}
		</>
	);
}
export default SettingsLayout;
