import PageTitle from "@/components/ui/title/page-title";
import TabDisplay from "@/app/home/chat/mail/[...slug]/components/tab-display";
import Pagination from "@/app/home/chat/mail/[...slug]/components/pagination";
import { getUserId } from "@/lib/session/session";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_EMAIL_TEMPLATE_BY_USER_ID from "@/utils/endpoints/external/email-templates/get-by-user-id";
import GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID from "@/utils/endpoints/external/email-templates/get-all-accessmodifier-id";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/access-modifier/get-all";
import { toast } from "sonner";

export default async function EmailTemplateListPage({
	params,
}: {
	params: { slug: string[] };
}) {
	const param = await params;
	const [templateType, pageParam] = param.slug;
	const currentPage = pageParam ? Number(pageParam) : 0;
	const userId = await getUserId();

	const { data: accessModifiers } = await serverApiRequest({
		connection: GET_ALL_ACCESS_MODIFIERS(),
	});

	if (!accessModifiers) {
		toast.error("Failed to fetch access modifiers");
		return null;
	}

	const accessModifierMap: Record<string, string> = {
		"private-email-templates": "Private",
		"public-email-templates": "Public",
		"default-email-templates": "Default",
	};

	const selectedModifierValue = accessModifierMap[templateType] ?? "";
	const accessModifierId = Number(
		accessModifiers.find(
			(mod: { value: string }) => mod.value === selectedModifierValue
		)?.id || 0
	);

	let emailTemplatesResponse;

	if (templateType === "private-email-templates") {
		emailTemplatesResponse = await serverApiRequest({
			connection: GET_ALL_EMAIL_TEMPLATE_BY_USER_ID(
				userId,
				currentPage,
				2
			),
		});
	} else {
		emailTemplatesResponse = await serverApiRequest({
			connection: GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID(
				accessModifierId,
				currentPage,
				2
			),
		});
	}

	const emailTemplates = emailTemplatesResponse?.data?.content ?? [];
	const totalPages = emailTemplatesResponse?.data?.page?.totalPages ?? 0;

	return (
		<>
			<PageTitle title="Mail" />
			<TabDisplay
				content={emailTemplates}
				page={emailTemplatesResponse?.data?.page}
				activeTabKey={templateType}
				accessModifiers={accessModifiers}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				path={templateType}
			/>
		</>
	);
}
