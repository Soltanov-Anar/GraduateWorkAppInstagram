import { FC, useEffect } from "react";
import Header from "../components/header";

const NotFoundPage: FC = () => {

  useEffect(() => {
    document.title = "Not found - Instagram"
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">
          Not Found!
        </p>
      </div>
    </div>
  )
};

NotFoundPage.displayName = "NotFoundPage";

export default NotFoundPage;