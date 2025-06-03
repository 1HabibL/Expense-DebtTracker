"use client"

import React, { useEffect, useState } from "react";

function SideBar() {
return(
<div>
  <nav className="h-screen w-56 bg-gradient-to-b from-slate-800 to-slate-700 text-white shadow-xl px-6 py-8">
    <ul className="space-y-8 text-lg font-medium tracking-wide">
      <li className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        Dashboard
      </li>
      <li className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        History
      </li>
      <li className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        Cards
      </li>
    </ul>
  </nav>
</div>
)
}

export default SideBar;