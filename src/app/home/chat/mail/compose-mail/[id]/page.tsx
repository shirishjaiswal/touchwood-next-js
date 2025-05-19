"use server";
import { getUserId } from "@/lib/session/session";
import PageTitle from "@/components/ui/title/page-title";
import EmailSender from "@/components/ui/email/email-sender";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_EMAIL_TEMPLATE_BY_ID from "@/utils/endpoints/external/email-template/get-by-id";
import IS_USER_EMAIL_SECURE_TOKEN_PRESENT from "@/utils/endpoints/external/email-secure-token/is-present";

async function ComposeMailPage({ params }: { params: { id: number } }) {
  const { id } = await params;
  const templateId = Number(id);
  const userId = await getUserId();

  const { data: emailTemplate } = await serverApiRequest({
    connection: GET_EMAIL_TEMPLATE_BY_ID({
      templateId: templateId,
      userId: userId,
    }),
  });
  const { data: privateTokenPresent = false } = await serverApiRequest({
    connection: IS_USER_EMAIL_SECURE_TOKEN_PRESENT(userId),
  });

  return (
    <>
      <PageTitle title="Compose Mail" />
      <EmailSender
        emailTemplate={emailTemplate}
        privateTokenPresent={privateTokenPresent}
      />
    </>
  );
}

export default ComposeMailPage;
