import { useState, useEffect } from "react";
import { getPhotos } from "./../services/firebase";

const usePhotos = (user: any) => {
  
  const [photos, setPhotos] = useState<any>(null);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      if (user?.following?.length > 0) {
        const followedUserPhotos =  
          await getPhotos(user.userId, user.following);
      
        followedUserPhotos.sort(
          (a: any, b : any) => b.dateCreated - a.dateCreated
        );
  
        setPhotos(followedUserPhotos);
      }
    }

    getTimeLinePhotos();

  }, [user?.userId, user?.following]);

  return { photos };

};

export default usePhotos;
