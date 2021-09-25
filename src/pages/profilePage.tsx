import { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { getUserByUsername } from "../services/firebase";
import { AppRoutes } from "../constants/contants";
import Header from "../components/header";
import UserProfile from "../components/profile";

const ProfilePage: FC = () => {

  const { username }: any = useParams();
  const history = useHistory();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    document.title = "Profile - Instagram";
  }, []);

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
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