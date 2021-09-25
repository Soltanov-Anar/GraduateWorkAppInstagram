import { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

type UserProps = {
  username: string,
  fullName: string
};

const User: FC<UserProps> = (
  { username, fullName }: UserProps
) => !username || !fullName ? (
  <Skeleton count={1} height={61} />
) : (
    // eslint-disable-next-line react/jsx-indent
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">
          {username}
        </p>
        <p className="text-sm">
          {fullName}
        </p>
      </div>
    </Link>
  );

User.displayName = "User";

export default User;