import { ParentType } from "@/app/admin/configuration/profile/[...slug]/components/group/group-content-render";

type FieldContentProps = {
  fieldContent: ParentType;
};
function FieldContent({ fieldContent }: FieldContentProps) {
  return (
    <div className="parent-content-container flex flex-col w-full justify-between gap-2 bg-neutral-100 rounded p-2">
      <div className=" flex justify-between items-center">
        <h1 className="text-xl font-semibold text-primary-600">
          {fieldContent.label}
        </h1>
      </div>
      <p className="text-sm text-neutral-600">{fieldContent.description}</p>
    </div>
  );
}

export default FieldContent;
