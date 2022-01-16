import { User } from "../store/user/types";
import { mockPhoto } from "./photo";

export const mockUser: User = {
  id: "1",
  email: "test@mail.com",
  token: "SoMeRaNdOmStRiNg",
  userName: "testuser",
  firebaseUid: "SoMeRaNdOmStRiNg",
  photos: [mockPhoto],
};
