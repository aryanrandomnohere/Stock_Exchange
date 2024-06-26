import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[22rem]">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
