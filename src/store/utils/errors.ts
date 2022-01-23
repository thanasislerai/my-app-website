import { AxiosError } from "axios";
import { get } from "lodash";

export const getAxiosErrorMessage = (err: unknown) => {
  const error = err as AxiosError;

  return (
    (get(error.response?.data, "message") as string | undefined) ||
    "Something went wrong"
  );
};
