import NavBar from "@/components/ui/nav-bar/nav-bar";
import Sidebar from "@/components/ui/sidebar/sidebar";
import { getUserRoles } from "@/lib/session/session";

async function HomeLayout({ children }: { children: React.ReactNode }) {
	const roles = await getUserRoles();
	return (
		<>
			<NavBar className="fixed z-10" />
			<Sidebar roles={roles} />
			<div className="relative flex h-11/12">
				<div className="relative w-full sm:w-[90%] md:w-[92%] lg-[94%] xl:w-[96%] ml-auto md:px-3">
					{children}
				</div>
			</div>
		</>
	);
}

export default HomeLayout;
