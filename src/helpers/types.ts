import { Dispatch } from "react"

export type CommentType = {
  displayName: string,
  comment: string
}

export type PostProps = {
  content: {
    imageSrc: string,
    caption: string,
    docId: string,
    likes: string[],
    comments: {
      displayName: string,
      comment: string
    }[],
    dateCreated: number,
    username?: string,
    userLikedPhoto?: boolean,
  }
}

export type ProfileProps = {
  dateCreated: number,
  emailAddress: string,
  followers: string[],
  following: string[],
  fullName: string,
  userId: string,
  username: string,
  docId: string,
}

export type ProfileState = {
  profile: ProfileProps,
  photosCollection: PhotoType["content"][],
  followerCount: number
}

export type HeaderProfile = {
  docId: string,
  userId: string,
  fullName: string,
  followers: string[],
  following: string[],
  username: string
}

export type PhotoType = {
  content: {
    caption: string,
    comments: CommentType[],
    dateCreated: number,
    docId: string,
    imageSrc: string,
    likes: string[],
    photoId: number,
    userId: string,
    userLatitude: string,
    userLongitude: string,
    username?: string
  }
}

export type User = {
  dateCreated: number,
  docId: string,
  emailAddress: string,
  followers: string[],
  following: string[],
  fullName: string,
  userId: string,
  username: string
}

export type UseUserType = {
  user: User,
  setActiveUser: Dispatch<User>
}