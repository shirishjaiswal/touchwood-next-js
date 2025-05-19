import { FormDataGroup_Read } from "@/lib/types/form-data/group";
import GroupContent from "@/app/home/configuration/profile/[...slug]/components/group/group-content";
import NoGroupPresent from "@/app/home/configuration/profile/[...slug]/components/group/no-group-present";
export interface TabContentGroupType {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  labelVisible: boolean;
  descriptionVisible: boolean;
  multiple: boolean;
  required: boolean;
  formDataTab: any;
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
