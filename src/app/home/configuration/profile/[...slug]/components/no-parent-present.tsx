import AddParent from "./add-parent";


function NoParentPresent() {
  return (
    <div className="empty-parent-list bg-neutral-100 flex flex-col justify-center items-center gap-2 rounded p-10">
      <h1 className="user-details--no-parents__title text-2xl font-semibold text-primary-600">No Parent Present</h1>
      <AddParent />
    </div>
  )
}
export default NoParentPresent;