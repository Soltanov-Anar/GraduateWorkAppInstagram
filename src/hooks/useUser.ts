import { useState, useEffect } from "react";
import { getUserByUserId } from "./../services/firebase";

const useUser = (userId: string) => {
  const [activeUser, setActiveUser] = useState<any>({});

  useEffect(() => {
    const getUserObjByUserId = async (userId: string) => {
    const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    };

    if (userId) {
      getUserObjByUserId(userId);
    };

  }, [userId]);

  return { user: activeUser};

};

export default useUser;
