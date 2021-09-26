import { FC } from 'react';
import Loader from 'react-loader-spinner';

const ReactLoader: FC = () => {
  return (
    <div className="flex justify-center mt-12">
      <Loader
        type="TailSpin"
        color="#00000059"
        height={70}
        width={70}
      />
    </div>
  );
}

ReactLoader.displayName = "ReactLoader";

export default ReactLoader;