import { pick, merge } from "lodash";

import { User, UserState } from "./types";

export const constructUserObject = (
  userData: User,
  token?: string
): UserState["userInfo"] =>
  merge(pick(userData, ["userName", "email", " imageUrl"]), {
    token,
  });
