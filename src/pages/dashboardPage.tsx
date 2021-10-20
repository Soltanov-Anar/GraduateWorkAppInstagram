import { FC, useEffect } from "react";
import Firebase from "firebase/compat/app";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import useUser from "../hooks/useUser";
import LoggedInUserContext from "../context/loggedInUser";
import { UseUserType } from "../helpers/types";


type DashboardPageProps = {
  user: Firebase.User
}

const DashboardPage: FC<DashboardPageProps> = (
  { user: loggedInUser }: DashboardPageProps
) => {

  const { user, setActiveUser }: UseUserType = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;