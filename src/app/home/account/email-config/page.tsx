import Description from "./components/desctiption";
import UserEmailSecureKey from "./components/user-email-securekey";

function Role() {
	return (
		<>
			<div className="sticky top-16 bg-white pb-2 px-2 gap-4">
				<h1 className="font-bold text-2xl uppercase mb-2">
					{"Email Configuration"}
				</h1>
				<UserEmailSecureKey />
			</div>
			<Description />
		</>
	);
}

export default Role;
