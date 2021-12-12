import { UserResponse, UserState } from "./types";

export const constructUserObject = (
  userData: UserResponse,
  token?: string
): UserState["userInfo"] => ({
  // eslint-disable-next-line no-underscore-dangle
  id: userData._id,
  email: userData.email,
  userName: userData.userName,
  imageUrl: userData.imageUrl,
  firebaseUid: userData.firebaseUid,
  token,
});
