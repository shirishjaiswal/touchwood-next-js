import React from "react";
import PageTitle from "@/components/ui/title/page-title";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_FORM_DATA_TAB from "@/utils/endpoints/external/form-data/tab/get-all";
import GET_FORM_DATA_GROUP_BY_TAB_ID from "@/utils/endpoints/external/form-data/group/get-by-tab-id";
import { toast } from "sonner";
import { FormDataTab_Read } from "@/lib/types/form-data/tab";
import { FormDataGroup_Read } from "@/lib/types/form-data/group";
import TabContainer from "./components/tabs/tab-container";
import GroupButtons from "./components/group/group-buttons";
import GroupContentRender from "./components/group/group-content-render";

const defaultTab: FormDataTab_Read = {
  id: 0,
  uniqueKey: "no-tabs-present",
  label: "No Tabs Present",
  description: "No tabs available.",
  link: "",
  position: 0,
};

async function Page({ params }: { params: { slug: string[] } }) {
  const paramsData = await params;
  const encodedKey = paramsData.slug[0];
  const decodedKey = decodeURIComponent(encodedKey || "");

  const {
    data: tabs,
    error: tabsError,
    status: tabsStatus,
  } = await serverApiRequest({
    connection: GET_ALL_FORM_DATA_TAB(),
  });

  if (tabsStatus !== 200 || !tabs) {
    return null;
  }

  const tabsData: FormDataTab_Read[] = tabs;

  const selectedTab =
    tabsData.length > 0
      ? (tabsData.find((tab) => tab.uniqueKey === decodedKey) ?? tabsData[0])
      : defaultTab;

  const currentTabLabel = selectedTab?.label || "Tab";

  let tabGroups: FormDataGroup_Read[] = [];
  let tabGroupsError: string | undefined;
  let tabGroupsStatus: number = 0;

  if (selectedTab && selectedTab?.id !== 0) {
    const {
      data: tabGroupsResponse,
      error: tabGroupsErrorResponse,
      status: tabGroupsStatusResponse,
    } = await serverApiRequest({
      connection: GET_FORM_DATA_GROUP_BY_TAB_ID(selectedTab.id),
    });

    tabGroups = tabGroupsResponse;
    tabGroupsError = tabGroupsErrorResponse;
    tabGroupsStatus = tabGroupsStatusResponse ?? 404;
  }

  if (selectedTab.id !== 0 && tabGroupsStatus !== 200) {
    toast.error(tabGroupsError || "Failed to load tab groups.");
    return null;
  }

  const tabGroupsData: FormDataGroup_Read[] = tabGroups;

  return (
    <>
      <div className="sticky top-16 bg-white pb-2 px-2 gap-4 z-20">
        <PageTitle title={"Profile Configuration"} />
        <TabContainer tabData={tabsData} activeTab={selectedTab.id} />
        {tabsData.length > 0 && <GroupButtons tabId={selectedTab.id} />}
      </div>
      {tabGroupsData.length > 0 && (
        <div className="p-2">
          <GroupContentRender groupListContent={tabGroupsData} />
        </div>
      )}
    </>
  );
}

export default Page;
