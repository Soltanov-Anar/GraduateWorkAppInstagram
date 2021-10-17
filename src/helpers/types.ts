export type CommentType = {
  displayName: string,
  comment: string
}

export type PostProps = {
  content: {
    username: string,
    imageSrc: string,
    caption: string,
    docId: string,
    userLikedPhoto: boolean,
    likes: string[],
    comments: {
      displayName: string,
      comment: string
    }[],
    dateCreated: number,
  }
}

export type ProfileProps = {
  dateCreated: number,
  emailAddress: string,
  followers: string[],
  following: string[],
  fullName: string,
  userId: string,
  username: string
}

export type ProfileState = {    
  profile: any,
  photosCollection: any[],
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
  caption: string,
  comments: CommentType[],
  dateCreated: number,
  docId: string,
  imageSrc: string,
  likes: string[],
  photoId: number,
  userId: string,
  userLatitude: string,
  userLongitude: string
}