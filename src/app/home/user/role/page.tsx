import Link from "next/link";
import RoleTable from "@/app/home/user/role/components/role-table";
import { Add } from "@/components/ui/icons";

function Role() {
	return (
		<>
			<div className="sticky top-16 bg-white pb-2 px-2 gap-4">
				<h1 className="font-bold text-2xl uppercase mb-2">
					{"Role" + " Configuration"}
				</h1>
				<div className="flex justify-end">
					<Link
						href={`/home/user/role/add-new-role`}
						id="add-email-template"
						className="md:w-fit flex gap-4"
					>
						<div className="flex gap-4 bg-primary p-3 rounded-lg text-white">
							{" "}
							<Add /> <p>Add New Role</p>{" "}
						</div>
					</Link>
				</div>
			</div>
			<RoleTable />
		</>
	);
}

export default Role;
