import { Connection } from "@/utils/api/types";

export type UPDATE_EMAIL_TEMPLATE_PAYLOAD = {
  id: number;
  label: string;
  subject: string;
  body: string;
  userId: number;
  accessModifierId: number;
}

const UPDATE_EMAIL_TEMPLATE = ( payload: UPDATE_EMAIL_TEMPLATE_PAYLOAD): Connection => {
  return {
    method: "PUT",
    endpoint: `/api/email-templates/${payload.id}?userId=${payload.userId}`,
    payload: payload
  };
};

export default UPDATE_EMAIL_TEMPLATE;