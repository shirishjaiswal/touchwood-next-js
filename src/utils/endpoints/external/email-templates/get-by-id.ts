
import { Connection } from "@/utils/api/types";

export type GET_EMAIL_TEMPLATE_BY_ID_PAYLOAD = {
  templateId: number;
  userId: number;
}

const GET_EMAIL_TEMPLATE_BY_ID = (payload: GET_EMAIL_TEMPLATE_BY_ID_PAYLOAD): Connection => {
  return {
    method: "GET",
    endpoint: `/api/email-templates/${payload.templateId}?userId=${payload.userId}`,
  };
};

export default GET_EMAIL_TEMPLATE_BY_ID;