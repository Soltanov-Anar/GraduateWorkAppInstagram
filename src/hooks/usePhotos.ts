import { useState, useEffect } from "react";
import { PhotoType, User } from "../helpers/types";
import { getPhotos } from "./../services/firebase";

const usePhotos = (user: User): { photos: PhotoType["content"][] } => {

  const [photos, setPhotos] = useState<PhotoType["content"][]>([] as PhotoType["content"][]);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      if (user?.following?.length > 0) {
        const followedUserPhotos: PhotoType["content"][] =
          await getPhotos(user.userId, user.following);

        followedUserPhotos.sort(
          (a: PhotoType["content"], b: PhotoType["content"]) => b.dateCreated - a.dateCreated
        );

        setPhotos(followedUserPhotos);
      }
    }

    getTimeLinePhotos();

  }, [user?.userId, user?.following]);

  return { photos };

};

export default usePhotos;
