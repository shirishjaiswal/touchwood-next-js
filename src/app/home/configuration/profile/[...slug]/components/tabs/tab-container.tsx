import "@/components/ui/tab/styles.css";
import { isEmpty } from "lodash";
import NoTabFound from "@/app/admin/configuration/profile/[...slug]/components/tabs/no-tab-found";
import EditableTabs from "@/app/admin/configuration/profile/[...slug]/components/tabs/editable-tabs";
import { FormDataTab_Read } from "@/lib/types/form-data/tab";

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabData: FormDataTab_Read[];
  activeTab: number;
}

function TabContainer({ tabData, activeTab }: TabProps) {
  if (isEmpty(tabData)) return <NoTabFound />;
  else return <EditableTabs tabList={tabData} activeTab={activeTab} />;
}

export default TabContainer;
