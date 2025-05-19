import { ParentType } from "@/app/admin/configuration/profile/[...slug]/components/group/group-content-render";
import NoFieldPresent from "@/app/admin/configuration/profile/[...slug]/components/field/no-parent-present";
import FieldContent from "@/app/admin/configuration/profile/[...slug]/components/field/field-content";

type FieldListContentProps = {
  parentListContent: ParentType[];
};
function FieldContentRender({ parentListContent }: FieldListContentProps) {
  if (parentListContent.length === 0) return <NoFieldPresent />;
  else
    return (
      <div className="group-content-container flex flex-col justify-between gap-2 bg-neutral-100 rounded p-2 w-full ">
        {parentListContent.map((parentContent) => (
          <FieldContent key={parentContent.id} fieldContent={parentContent} />
        ))}
      </div>
    );
}

export default FieldContentRender;
