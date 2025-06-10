"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";


function SideBar({designatedComponent, setdesignatedComponent}) {
  //const [designatedComponent, setdesignatedComponent] = useState("home")

  
/*const handleClick = (value) => {
  setdesignatedComponent(value);
   console.log("Selected:", value);
}*/


return(
<div>
  <nav className="h-screen w-56 bg-gradient-to-b from-slate-800 to-slate-700 text-white shadow-xl px-6 py-8">
    <ul className="space-y-8 text-lg font-medium tracking-wide">
      <li onClick={() => setdesignatedComponent("home")} className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        Home
      </li>
      <li onClick={() => setdesignatedComponent("dashboards")} className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        Dashboard
      </li>
      <li value="history" onClick={() => setdesignatedComponent("history")}  className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        History
      </li>
      <li value="cards" onClick={() => setdesignatedComponent("cards")} className="hover:text-cyan-300 transition duration-200 cursor-pointer">
        Cards
      </li>
    </ul>
  </nav>

</div>

)
}

export default SideBar;