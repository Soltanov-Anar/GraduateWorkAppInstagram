import { FC } from "react";

type FooterProps = {
  caption: string,
  username: string,
}

const Footer: FC<FooterProps> = (
  { caption, username }: FooterProps
) => {

  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">
        {username}
      </span>

      <span>{caption}</span>
    </div>
  );
};

Footer.displayName = "Footer";

export default Footer;