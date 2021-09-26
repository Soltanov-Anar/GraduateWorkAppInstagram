import { FC, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggestedProfile";

type SuggestionsProps = {
  loggedInUserDocId: string,
  userId: string,
  following: number[]
}

const Suggestions: FC<SuggestionsProps> = (
  { loggedInUserDocId, userId, following }: SuggestionsProps
) => {

  const [profiles, setProfiles] = useState<any>(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    };

    if (userId) {
      suggestedProfiles();
    };

  }, [userId])

  return !profiles ? (
    <Skeleton
      count={1}
      height={150}
      className="mt-5"
    />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">
          Suggestions for you
        </p>
      </div>

      <div className="mt-4 grid gap-5">
        {profiles.map((profile: any) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.displayName = "Suggestions";

export default Suggestions;