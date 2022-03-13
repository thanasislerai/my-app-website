import { Photo } from "../user/types";

export const getPhotoCoordinates = (
  photo?: Photo
): [number, number] | undefined => (photo ? [photo.lng, photo.lat] : undefined);
