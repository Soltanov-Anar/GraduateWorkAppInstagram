import { FC, useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from "../services/firebase";
import { AppRoutes } from "../constants/contants";
import Header from "../components/header";
import UserProfile from "../components/profile";
import { User } from "../helpers/types";

const ProfilePage: FC = () => {

  const { username } = useParams<{ username?: string }>();
  const [user, setUser] = useState<User>({} as User);
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile - Instagram";
  }, []);

  useEffect(() => {
    const checkUserExists = async () => {
      const [user]: User[] = await getUserByUsername(username || "");
      if (user?.userId) {
        setUser(user);
        document.title = `${user.username} - Instagram`;
      } else {
        history.push(AppRoutes.NOT_FOUND)
      }
    };

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;