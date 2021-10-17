import { FC, useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import LoggedInUserContext from "../../context/loggedInUser";

const Sidebar: FC = () => {

  const {
    user: {
      docId = "",
      fullName = "",
      username = "",
      userId = "",
      following = []
    } = {}
  }: any = useContext(LoggedInUserContext);

  return (
    <div className="hidden md:block p-4">
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