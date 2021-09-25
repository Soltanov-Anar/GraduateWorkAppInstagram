import { FC, useState, useEffect, Dispatch } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import { HeaderProfile } from "../../helpers/types";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

type HeaderProps = {
  photosCount: number,
  profile: HeaderProfile,
  followerCount: number
  setFollowerCount: Dispatch<any>
}

const Header: FC<HeaderProps> = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername
  }
}: HeaderProps) => {

  const { user = {} }: any = useUser();

  const [
    isFollowingProfile,
    setIsFollowingProfile
  ] = useState<boolean>(false);

  const activeBtnFollow =
    user.username &&
    user.username !== profileUsername;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing =
        await isUserFollowingProfile(user.username, profileUserId);

      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }

  }, [user.username, profileUserId])

  const handleToggleFollow = async () => {
    setIsFollowingProfile(
      (isFollowingProfile: boolean) => !isFollowingProfile
    );

    setFollowerCount({
      followerCount:
        isFollowingProfile ?
          --followerCount :
          ++followerCount
    });

    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile picture`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">
            {profileUsername}
          </p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleToggleFollow();
                };
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="container flex mt-4">
          {!followers.length && !following.length ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">
                  {photosCount}
                </span>
                {" "}
                photos
              </p>

              <p className="mr-10">
                <span className="font-bold">
                  {followerCount}
                </span>
                {" "}
                {followerCount === 1 ? "follower" : "followers"}
              </p>

              <p className="mr-10">
                <span className="font-bold">
                  {following.length}
                </span>
                {" "}
                following
              </p>
            </>
          )}
        </div>

        <div className="container mt-4">
          <p className="font-medium">
            {
              !fullName ? <Skeleton count={1} height={24} /> : fullName
            }
          </p>
        </div>

      </div>
    </div>
  );
};

Header.displayName = "Header";

export default Header;