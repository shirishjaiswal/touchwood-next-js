function NoGroupPresent() {
	return (
		<div className="empty-group-list bg-neutral-100 flex flex-col justify-center items-center gap-2 rounded p-10">
			<h1 className="user-details--no-groups__title text-2xl font-semibold text-primary-600">
				No Group Present
			</h1>
		</div>
	);
}
export default NoGroupPresent;
