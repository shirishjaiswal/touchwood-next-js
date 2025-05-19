import GET_EMAIL_TEMPLATE_BY_ID from "@/utils/endpoints/external/email-template/get-by-id";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/data-access-modifier/get-all";
import serverApiRequest from "@/utils/api/server-api-request";

import CreateAndEditEmailTemplate from "@/app/home/chat/mail/mail-template/[id]/components/create-and-edit-email-template";
import PageTitle from "@/components/ui/title/page-title";
import { getUserId } from "@/lib/session/session";

async function EmailTemplatePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const templateId = Number(id);
  const userId = await getUserId();
  const { data: emailTemplate } = await serverApiRequest({
    connection: GET_EMAIL_TEMPLATE_BY_ID({
      templateId: templateId,
      userId: userId,
    }),
  });

  const { data: accessModifiers } = await serverApiRequest({
    connection: GET_ALL_ACCESS_MODIFIERS(),
  });

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

export default EmailTemplatePage;
