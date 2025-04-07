import { ParentType } from "./group-list-content";

type ParentContentProps = {
  parentContent: ParentType
}
function ParentContent({ parentContent }: ParentContentProps) {
  return (
    <div className="parent-content-container flex flex-col justify-between gap-2 bg-neutral-100 rounded p-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-semibold text-primary-600">{parentContent.label}</h1>
      </div>
      <p className="text-sm text-neutral-600">{parentContent.description}</p>
    </div>
  );
}

export default ParentContent;