import React from "react";
import { Typography } from "@material-tailwind/react";
import { MenuItem } from "@material-tailwind/react";
import {
  WalletIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const valueList = [
  {
    label: "Airport pickup",
    icon: PaperAirplaneIcon,
    description: "We provide escort from the airport to the hotel",
  },
  {
    label: "Easy booking",
    icon: WalletIcon,
    description: "Quick and easy booking of tours for upcoming dates",
  },
  {
    label: "Best tour guide",
    icon: UserGroupIcon,
    description: "Our best tour guid is ready to guide your trip",
  },
  {
    label: "Lost of promotion",
    icon: BanknotesIcon,
    description: "Various promotion and drawings of tours",
  },
];

const Value = () => {
  return (
    <div className="flex flex-col lg:justify-center lg:items-center mt-8 lg:my-20">
      <h1 className="text-5xl font-bold">Top values for you</h1>
      <p className="my-5 font-extralight lg:font-medium w-64 lg:w-full">
        Try variety of benefits when using our services
      </p>

      <ul className="relative lg:flex gap-5 -translate-x-2 lg:-translate-x-0 ">
        {valueList.map(({ label, icon, description }, key) => (
          <li key={label} className="pointer-events-none">
            <div className="font-bold text-black text-lg mb-8">
              <MenuItem
                placeholder={""}
                className="flex lg:flex-col items-center gap-3 lg:gap-2 hover:bg-transparent">
                {React.createElement(icon, {
                  className: "w-16 bg-gray-200 rounded-full p-3",
                  strokeWidth: 1.5,
                })}
                <div className="flex flex-col lg:m-0">
                  <span className="text-black mb-1 lg:mb-0">{label}</span>
                  <span className="text-gray-600 text-sm w-44 lg:w-2/3 lg:text-center ">
                    {description}
                  </span>
                </div>
              </MenuItem>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Value;
