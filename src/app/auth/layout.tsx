import GuestNavBar from "@/components/ui/nav-bar/guest/guest-nav-bar";

async function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<GuestNavBar className="fixed top-0 z-10" />
			{children}
		</div>
	);
}

export default AuthLayout;
