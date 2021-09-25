import { FC, useReducer, useEffect } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";
import { ProfileProps } from "../../helpers/types";

type ProfileType = {
  user: ProfileProps
}

const Profile: FC<ProfileType> = (
  { user }: ProfileType
) => {

  const reducer = (
    state: any, newState: any
  ) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: [],
  }

  const [
    { profile, photosCollection, followerCount },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUsername(user.username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length
      });
    };

    getProfileInfoAndPhotos();

  }, [user]);

  return (
    <>
      <Header
        photosCount={
          photosCollection ? photosCollection.length : 0
        }
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />

      <Photos photos={photosCollection} />
    </>
  );
};

Profile.displayName = "Profile";

export default Profile;