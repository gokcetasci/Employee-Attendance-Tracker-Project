"use client"
import React from "react";
import useStore from "@/utils/store";
import { FcBusinessman } from "react-icons/fc";
function Header() {
  const { admin } = useStore();

  return (
    <div className="w-full h-24 p-5">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{admin.name}</h2>
          <p>Admin {admin.id}</p>
          <span ><FcBusinessman className="w-10 h-10 rounded-full border border-2 border-black bg-indigo-200" /></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
