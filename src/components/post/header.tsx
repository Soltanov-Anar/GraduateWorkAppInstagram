import { FC } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/contants";

type HeaderProps = {
  username: string,
}

const Header: FC<HeaderProps> = (
  { username }: HeaderProps
) => {

  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link
          to={`/p/${username}`}
          className="flex items-center"
        >
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile picture`}
            className="rounded-full h-8 w-8 flex mr-3"
            onError={(event: any) => {
              event.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
          <p className="font-bold">
            {username}
          </p>
        </Link>
      </div>
    </div>
  )
};

Header.displayName = "Header";

export default Header;