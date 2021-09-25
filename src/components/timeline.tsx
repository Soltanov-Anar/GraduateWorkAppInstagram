import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import Post from "./post";

const Timeline: FC = () => {

  const { photos } = usePhotos();

  console.log("photos", photos);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton
          count={4}
          width={640}
          height={500}
          className="mb-5"
        />
      ) : photos?.length > 0 ? (
        photos.map((content: any) =>
          <Post key={content.docId} content={content} />
        )
      ) : (
        <p className="text-center text-2xl">
          Follow people to see photos!
        </p>
      )}
    </div>
  )
};

Timeline.displayName = "Timeline";

export default Timeline;