import { useState, useEffect } from "react";
import { User, UseUserType } from "../helpers/types";
import { getUserByUserId } from "./../services/firebase";

const useUser = (userId: string): UseUserType => {
  const [activeUser, setActiveUser] = useState<User>({} as User);

  useEffect(() => {
    const getUserObjByUserId = async (userId: string) => {
      const [user]: User[] = await getUserByUserId(userId);
      setActiveUser(user || {} as User);
    };

    if (userId) {
      getUserObjByUserId(userId);
    };

  }, [userId]);

  return { user: activeUser, setActiveUser };

};

export default useUser;
