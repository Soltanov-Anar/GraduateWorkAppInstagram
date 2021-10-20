/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../helpers/types";
import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExist = async (username: string): Promise<boolean> => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
};

export const getUserByUsername = async (username: string): Promise<User[]> => {
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

export const getUserByUserId = async (userId: string): Promise<any[]> => {
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
  userId: string, following: string[]
): Promise<any[]> => {

  let query: any = firebase.firestore().collection("users");

  if (following.length > 0) {
    query = query.where("userId", "not-in", [...following, userId]);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query = query.where("userId", "!=", userId);
  }

  const result = await query.limit(10).get();

  const profiles = result.docs.map((user: any) => ({
    ...user.data(),
    docId: user.id
  }));

  return profiles;
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
): Promise<void> => {
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
): Promise<void> => {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
};

export const getPhotos = async (
  userId: string,
  following: string[]
): Promise<any[]> => {

  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo: any) => ({
    ...photo.data(),
    docId: photo.id
  }));


  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo: any) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      };

      const user = await getUserByUserId(photo.userId);

      const { username }: any = user[0];

      return { username, ...photo, userLikedPhoto };

    })
  );

  return photosWithUserDetails;
};

export const getUserPhotosByUserId = async (
  userId: string
): Promise<any[]> => {

  const user = await getUserByUserId(userId);
  const { username }: any = user[0];

  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();


  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
    username: username
  }));

  return photos;
};

export const isUserFollowingProfile = async (
  loggedInUserUsername: string,
  profileUserId: string
): Promise<any> => {

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
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
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