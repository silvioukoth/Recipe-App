import React from "react";

const Alert = ({ alert }) => {
  return (
    <div className="absolute top-[-3rem] left-0 bg-red-500 w-[calc(100%-0.4rem)] rounded-md p-2">
      <h3 className="text-center text-white text-xl font-normal uppercase">{alert}</h3>
    </div>
  );
};

export default Alert;