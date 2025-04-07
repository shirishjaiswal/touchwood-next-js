import { Connection } from "@/utils/api/types";

const GET_ALL_EMAILS_TEMPLATE_ID_LABEL = (): Connection => {
  return {
    method: "GET",
    endpoint: "/api/email-templates/id-label",
  };
};

export default GET_ALL_EMAILS_TEMPLATE_ID_LABEL;