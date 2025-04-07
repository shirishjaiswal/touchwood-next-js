import GET_EMAIL_TEMPLATE_BY_ID from "@/utils/endpoints/external/email-templates/get-by-id";
import CreateAndEditEmailTemplate from "./components/create-and-edit-email-template";
import serverApiRequest from "@/utils/api/server-api-request";
import PageTitle from "@/components/ui/title/page-title";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/access-modifier/get-all";
import { getUserId } from "@/lib/session/session";

async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;
	const userId = await getUserId();
	
	const apiResponseMailTemplate = await serverApiRequest({
		connection: GET_EMAIL_TEMPLATE_BY_ID({
			templateId: Number(id),
			userId: userId,
		}),
	});
	
	const emailTemplate = apiResponseMailTemplate.data;

	const apiResponseAccessModiefier = await serverApiRequest({
		connection: GET_ALL_ACCESS_MODIFIERS(),
	});

	const accessModifiers = apiResponseAccessModiefier.data;

	return (
		<>
			<PageTitle title="Email Template" />
			<CreateAndEditEmailTemplate emailTemplate={emailTemplate} accessModifiers={accessModifiers} />
		</>
	);
}

export default Page;
