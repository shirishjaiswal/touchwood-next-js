import { ParentType } from "./group-list-content";
import ParentContent from "./parent-content";
import NoParentPresent from "./no-parent-present";

type ParentListContentProps = {
  parentListContent: ParentType[];
}
function ParentListContent({ parentListContent }: ParentListContentProps) {
  if (parentListContent.length === 0) return <NoParentPresent />
  else return (
    <div className="group-content-container flex flex-col justify-between gap-2 bg-neutral-100 rounded p-2">
      <div className="w-full flex flex-col gap-2">
        {parentListContent.map((parentContent) => (
          <ParentContent key={parentContent.id} parentContent={parentContent} />
        ))}
      </div>
    </div>
  );
}

export default ParentListContent;