import { Photo, UserResponse, UserState } from "./types";

export const constructUserObject = (
  userData: UserResponse,
  photos: Photo[],
  token?: string
): UserState["userInfo"] => ({
  // eslint-disable-next-line no-underscore-dangle
  id: userData._id,
  email: userData.email,
  photos,
  userName: userData.userName,
  imageUrl: userData.imageUrl,
  firebaseUid: userData.firebaseUid,
  token,
});
