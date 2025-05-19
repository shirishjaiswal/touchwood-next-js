import { Suspense } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Add } from "@/components/ui/icons";
import { getUserId } from "@/lib/session/session";
import PageTitle from "@/components/ui/title/page-title";
import serverApiRequest from "@/utils/api/server-api-request";
import ClickButton from "@/components/ui/button/click-button";
import TabDisplay from "@/app/home/chat/mail/[...slug]/components/tab-display";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/data-access-modifier/get-all";
import GET_ALL_EMAIL_TEMPLATE_BY_USER_ID from "@/utils/endpoints/external/email-template/get-by-user-id";
import GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID from "@/utils/endpoints/external/email-template/get-all-accessmodifier-id";

import EmailTemplates from "./components/email-templates";
import Pagination from "@/components/ui/button/pagination";

export default async function EmailTemplateListPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [templateType, pageParam] = params.slug;
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
      connection: GET_ALL_EMAIL_TEMPLATE_BY_USER_ID(userId, currentPage, 2),
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
  const totalPages = emailTemplatesResponse?.data?.totalPages ?? 0;
  const pageNumber =
    emailTemplatesResponse?.data?.pageable?.pageNumber ?? 0;

  return (
    <>
      <div className="sticky top-16 bg-white pb-2 px-2 gap-4 z-10">
        <PageTitle title="Email Templates" />
        <Suspense fallback={<p>Loading tabs...</p>}>
          <TabDisplay activeTabKey={templateType} />
        </Suspense>
        <div className="flex justify-end mt-2">
          <ClickButton
            id="create-email-template-button"
            variant="shadow-default"
            size="xs"
          >
            <Link href="/home/chat/mail/mail-template">
              <div className="flex gap-2 justify-center items-center text-white">
                <Add /> <span className="text-base">Create New Template</span>
              </div>
            </Link>
          </ClickButton>
        </div>
      </div>

      <Suspense fallback={<p>Loading templates...</p>}>
        <EmailTemplates
          content={emailTemplates}
          page={emailTemplatesResponse?.data?.page}
          accessModifiers={accessModifiers}
        />
      </Suspense>

      <Suspense fallback={<p>Loading pagination...</p>}>
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          path={templateType}
        />
      </Suspense>
    </>
  );
}
