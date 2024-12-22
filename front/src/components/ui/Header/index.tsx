import React from "react";

interface HeaderParams{
  label:string;
  customClassname:string;
}

const Header = ({label,customClassname}:HeaderParams) => {
  return (
    <div className={`w-full h-7 border-b-[1px] border-gray-200 ${customClassname}`}>
      {label}
    </div>
  );
};

export default Header;
