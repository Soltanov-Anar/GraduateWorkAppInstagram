import { FC } from "react";

type ImageProps = {
  src: string,
  caption: string
}

const Image: FC<ImageProps> = (
  { src, caption }: ImageProps
) => {

  return <img src={src} alt={caption} />;
};

Image.displayName = "Image";

export default Image;