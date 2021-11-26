import { FC, SyntheticEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserByUserId,
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers
} from "../../services/firebase";
import LoggedInUserContext from "../../context/loggedInUser";
import { DEFAULT_IMAGE_PATH } from "../../constants/contants";

type SuggestedProfileProps = {
  profileDocId: string,
  username: string,
  profileId: string,
  userId: string,
  loggedInUserDocId: string
}

const SuggestedProfile: FC<SuggestedProfileProps> = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}: SuggestedProfileProps) => {

  const [followed, setFollowed] = useState<boolean>(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);

    const [user] = await getUserByUserId(userId);
    setActiveUser(user);
  };

  const imageOnErrorHandler = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = DEFAULT_IMAGE_PATH;
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/p/${username}`} className="inline-flex items-center">
          <img
            className="rounded-full w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`avatar ${username}`}
            onError={imageOnErrorHandler}
          />
          <p className="font-bold text-sm">
            {username}
          </p>
        </Link>
      </div>
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.displayName = "SuggestedProfile";

export default SuggestedProfile;