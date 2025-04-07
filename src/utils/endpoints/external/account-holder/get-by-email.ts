import { Connection } from "@/utils/api/types";

const GET_USER_ACCOUNT_BY_EMAIL = (email: string): Connection => {
  return {
    method: "GET",
    endpoint: `/api/users/email/${email}`,
  };
};

export default GET_USER_ACCOUNT_BY_EMAIL;