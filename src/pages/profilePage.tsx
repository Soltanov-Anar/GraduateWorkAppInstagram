import { FC, useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from "../services/firebase";
import { AppRoutes } from "../constants/contants";
import Header from "../components/header";
import UserProfile from "../components/profile";

const ProfilePage: FC = () => {

  const { username }: any = useParams();
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile - Instagram";
  }, []);

  useEffect(() => {
    const checkUserExists = async () => {
      const [user]: any = await getUserByUsername(username);
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