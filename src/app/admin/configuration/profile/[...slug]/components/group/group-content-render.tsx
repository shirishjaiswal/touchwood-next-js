import { FormDataGroup_Read } from "@/lib/types/form-data/group";
import GroupContent from "./group-content";
import NoGroupPresent from "./no-group-present";
import { FormDataTab_Read } from "@/lib/types/form-data/tab";
export interface TabContentGroupType {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  labelVisible: boolean;
  descriptionVisible: boolean;
  multiple: boolean;
  required: boolean;
  formDataTab: FormDataTab_Read;
  formDataParent: ParentType[];
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
  groupListContent: FormDataGroup_Read[];
};

function GroupContentRender({ groupListContent }: GroupListContentProps) {
  if (groupListContent.length === 0) return <NoGroupPresent />;
  else
    return groupListContent?.map((groupContent) => (
      <GroupContent key={groupContent.id} groupContent={groupContent} />
    ));
}

export default GroupContentRender;
