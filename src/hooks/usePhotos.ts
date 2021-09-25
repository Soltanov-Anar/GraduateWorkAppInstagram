import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from './../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState<any>(null);
  const {
    user: { uid: userId = "" }
  } = useContext(UserContext);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      const [{ following }]: any = await getUserByUserId(userId);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort(
        (a: any, b : any) => b.dateCreated - a.dateCreated
      );

      setPhotos(followedUserPhotos);
    }

    getTimeLinePhotos();

  }, [userId]);

  return { photos };

};

export default usePhotos;
