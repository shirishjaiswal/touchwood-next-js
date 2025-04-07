import AddGroup from "./add-group";

type TabGroupButtonsProps = {
  activeTabId: number
}
function TabGroupButtons({ activeTabId }: TabGroupButtonsProps) {
  return (
    <div className="flex w-full justify-end gap-2 mt-5 sm:mt-1">
      <AddGroup />
    </div>
  );
}

export default TabGroupButtons;