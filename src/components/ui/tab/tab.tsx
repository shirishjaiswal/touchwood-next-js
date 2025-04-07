import '@/components/ui/tab/styles.css'
import { isEmpty } from "lodash";
import NoTabFound from '@/components/ui/tab/no-tab-found';
import TabDisplay, { TabType } from '@/components/ui/tab/tab-display';

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabList: TabType[];
  activeTab: number; 
}

function Tab({ tabList, activeTab }: TabProps) {
  if (isEmpty(tabList)) return <NoTabFound />;
  else return <TabDisplay tabList={tabList} activeTab={activeTab} />
}

export default Tab;
