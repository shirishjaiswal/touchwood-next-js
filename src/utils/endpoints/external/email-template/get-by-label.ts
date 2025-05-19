import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type GET_EMAIL_TEMPLATE_BY_LABEL_PAYLOAD = {
  label: string
}

const GET_EMAIL_TEMPLATE_BY_LABEL = ({ label }: GET_EMAIL_TEMPLATE_BY_LABEL_PAYLOAD): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}/label/${label}`
  };
};

export default GET_EMAIL_TEMPLATE_BY_LABEL;