import { FC, useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import LoggedInUserContext from "../../context/loggedInUser";
import { UseUserType } from "../../helpers/types";

const Sidebar: FC = () => {

  const {
    user: {
      docId,
      fullName,
      username,
      userId,
      following,
    }
  }: UseUserType = useContext(LoggedInUserContext);

  return (
    <div className="hidden lg:block p-4">
      <User
        username={username}
        fullName={fullName}
      />
      <Suggestions
        loggedInUserDocId={docId}
        userId={userId}
        following={following}
      />
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;