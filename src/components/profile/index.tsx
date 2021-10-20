import { FC, useReducer, useEffect } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";
import { PhotoType, ProfileProps, ProfileState } from "../../helpers/types";

type ProfileType = {
  user: ProfileProps
}

const Profile: FC<ProfileType> = (
  { user }: ProfileType
) => {

  const reducer = (
    state: ProfileState,
    newState: ProfileState | { followerCount: number }
  ): ProfileState => ({ ...state, ...newState });

  const initialState: ProfileState = {
    profile: {} as ProfileState["profile"],
    photosCollection: [] as ProfileState["photosCollection"],
    followerCount: 0,
  }

  const [
    { profile, photosCollection, followerCount },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {

      const photos: PhotoType["content"][] = await getUserPhotosByUserId(user.userId);

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