import GroupContent from "./group-content";
import NoGroupPresent from "./no-group-present";
export interface TabContentGroupType {
  id: number;
  key: string;
  tabId: number;
  label: string;
  description: string;
  labelVisible: boolean;
  descriptionVisible: boolean;
  multiple: boolean;
  parent: ParentType[];
  required: boolean;
}
export interface ParentType {
  id: number;
  key: string;
  inputType: string;
  label: string;
  description: string;
  value: string[];
  labelVisible: boolean;
  required: boolean;
}
type GroupListContentProps = {
  groupListContent: TabContentGroupType[];
};

function GroupListContent({ groupListContent }: GroupListContentProps) {
  if (groupListContent.length === 0) return <NoGroupPresent />
  else return (
    groupListContent?.map((groupContent) => (
      <GroupContent key={groupContent.id} groupContent={groupContent} />
    ))
  )
}

export default GroupListContent;