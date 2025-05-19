import AddGroup from "@/app/admin/configuration/profile/[...slug]/components/group/add-group";

type TabContentGroupType = {
  tabId: number;
};

function GroupButtons({ tabId }: TabContentGroupType) {
  return (
    <div className="flex w-full justify-end gap-2 mt-5 sm:mt-1">
      <AddGroup formDataTabId={tabId} />
    </div>
  );
}

export default GroupButtons;
