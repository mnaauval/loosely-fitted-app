import React from "react";

const RequiredScreen = () => {
  return (
    <div className="xs:hidden block">
      <div className="flex items-center absolute top-0 bottom-0">
        <h1 className="text-center text-4xl">Please use device larger than this screen</h1>
      </div>
    </div>
  );
};

export default RequiredScreen;
