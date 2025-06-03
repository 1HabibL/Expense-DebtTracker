"use client"

import React, { useEffect, useState } from "react";

function sideBar() {
return(
<div>
  <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-gray-800 shadow-md py-4 px-10">
    <ul className="flex justify-between items-center text-white text-lg font-medium tracking-wide">
      {/* Left: App Title or Logo */}
      <li className="text-2xl font-semibold tracking-wider text-white">
        ExpenseTracker
      </li>

      {/* Right: Nav Items */}
      <div className="flex space-x-10 items-center">
        <li className="hover:text-purple-300 transition duration-200 cursor-pointer">
          Home
        </li>
        <li className="hover:text-purple-300 transition duration-200 cursor-pointer">
          Notifications
        </li>
        <li className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-xl shadow-md transition duration-200 cursor-pointer">
          Sign Up
        </li>
      </div>
    </ul>
  </nav>
</div>
)
}

export default sideBar;