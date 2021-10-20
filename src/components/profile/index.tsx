import { FC, useReducer, useEffect } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";
import { ProfileProps } from "../../helpers/types";

type ProfileType = {
  user: ProfileProps
}

const Profile: FC<ProfileType> = (
  { user }: ProfileType
) => {

  const reducer = (state: any, newState: any) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  }

  const [
    { profile, photosCollection, followerCount },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length
      });
    };

    getProfileInfoAndPhotos();

  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />

      {photosCollection.length > 0 && <Photos photos={photosCollection} />}
    </>
  );
};

Profile.displayName = "Profile";

export default Profile;