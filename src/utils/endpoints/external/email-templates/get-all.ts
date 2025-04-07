import { Connection } from "@/utils/api/types";

const GET_ALL_EMAIL_TEMPLATE = (): Connection => {
  return {
    method: "GET",
    endpoint: "/api/config-emails/all",
  };
};

export default GET_ALL_EMAIL_TEMPLATE;