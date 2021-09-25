import { FC } from "react";
import useUser from "../../hooks/useUser";
import User from "./user";
import Suggestions from "./suggestions";

const Sidebar: FC = () => {
  const {
    user: { docId, fullName, username, userId, following }
  }: any = useUser();


  return (
    <div className="p-4">
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