import { FC, useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import useUser from "../hooks/useUser";
import LoggedInUserContext from "../context/loggedInUser";

type DashboardPageProps = {
  user: any
}

const DashboardPage: FC<DashboardPageProps> = (
  { user: loggedInUser }: any
) => {

  console.log("loggedInUser", loggedInUser);

  const { user, setActiveUser }: any = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;