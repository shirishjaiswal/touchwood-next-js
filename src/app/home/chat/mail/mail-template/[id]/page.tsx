import GET_EMAIL_TEMPLATE_BY_ID from "@/utils/endpoints/external/email-template/get-by-id";
import CreateAndEditEmailTemplate from "./components/create-and-edit-email-template";
import serverApiRequest from "@/utils/api/server-api-request";
import PageTitle from "@/components/ui/title/page-title";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/data-access-modifier/get-all";
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
      <div className="sticky top-16 bg-white pb-2 px-2 gap-4 z-10">
        <PageTitle title="Email Template" />
      </div>
      <CreateAndEditEmailTemplate
        emailTemplate={emailTemplate}
        accessModifiers={accessModifiers}
      />
    </>
  );
}

export default Page;
