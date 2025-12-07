import React from "react";
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LineWave
        visible={true}
        height="200"
        width="200"
        color="#2ec4b6"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
};

export default Loader;
