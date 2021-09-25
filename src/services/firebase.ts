import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExist = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
};

export const getUserByUsername = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.map((item: any) => ({
    ...item.data(),
    docId: item.id
  }));
};

export const getUserByUserId = async (userId: string) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
};

export const getSuggestedProfiles = async (
  userId: string, following: number[]
) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .limit(10)
    .get();

  return result.docs
    .map((user: any) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    })
};

export const updateFollowedUserFollowers = async (
  profileDocId: string,
  loggedInUserDocId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })
};

export const getPhotos = async (
  userId: string,
  following: string[]
) => {

  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo: any) => ({
    ...photo.data(),
    docId: photo.id
  }));

  console.log("userFollowedPhotos", userFollowedPhotos);

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo: any) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);

      console.log("user", user);
      const { username }: any = user[0];

      return { username, ...photo, userLikedPhoto };

    })
  );

  return photosWithUserDetails;
};

export const getUserPhotosByUsername = async (username: string) => {

  const [ user ] = await getUserByUsername(username);

  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get()

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
};

export const isUserFollowingProfile = async (
  loggedInUserUsername: string,
  profileUserId: string
) => {

  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}]: any = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  
  return response.userId;
};

export const toggleFollow = async (
  isFollowingProfile : boolean,
  activeUserDocId : string,
  profileDocId : string,
  profileUserId: string,
  followingUserId: string,
): Promise<void> => {

  await updateLoggedInUserFollowing(
    activeUserDocId, 
    profileUserId,
    isFollowingProfile
  );

  await updateFollowedUserFollowers(
    profileDocId, 
    followingUserId, 
    isFollowingProfile
  );
};