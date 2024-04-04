"use client";
import React, { useState } from "react";
import useStore from "@/utils/store";
import { FcBusinessman } from "react-icons/fc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaStore } from "react-icons/fa6";
import { FcManager,FcAssistant } from "react-icons/fc";

function Header() {
  const { admin } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full h-24 p-2 bg-slate-100">
      <div
        className="flex flex-row mx-3 my-2 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-md justify-between py-2 px-5"
        style={{ boxShadow: "0 0 4px #cbd5e1" }}
      >
        <div className="relative flex flex-row items-center justify-center ">
          <h1 className="text-lg font-medium  text-indigo-600 ">Şubeler</h1>
          <span className="pt-1 " onClick={toggleDropdown}>
            <MdKeyboardArrowDown className="w-6 h-6 text-blue-600 hover:text-blue-400 hover:scale-110" />
          </span>{" "}
          {showDropdown && (
            <ul className="absolute left-0 top-full bg-white  rounded-md mt-1 shadow-lg z-10 text-gray-500 w-[200px]" style={{ boxShadow: "0 0 4px #cbd5e1" }}>
              {admin.branches.map((branch) => (
                <li
                  key={branch.id}
                  className="py-1 px-3 cursor-pointer hover:bg-gray-100 "
                >
                  <p className="flex flex-row items-center gap-2">
                    <FaStore className="text-indigo-600"/>
                    {branch.name}
                  </p>
                  <p className="pl-5 text-[14px] flex flex-row items-center gap-2">
                    <FcManager />{branch.manager.name}
                  </p>
                  <ul>
                    {branch.manager.employees.map((employee) => (
                      <li key={employee.id} className="pl-10 text-[14px] flex flex-row items-center gap-2">
                        <FcAssistant />{employee.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center justify-center text-indigo-600 relative">
          <div className="text-right cursor-pointer">
            <h2 className="text-md font-semibold font-medium">
              {admin.name}
            </h2>
            <p className="text-sm">Admin {admin.id}</p>
          </div>
          <span>
            <FcBusinessman className="w-10 h-10 rounded-full border border-1 border-indigo-500 bg-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
