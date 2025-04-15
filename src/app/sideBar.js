"use client"

import React, { useEffect, useState } from "react";

function SideBar() {
return(
    <div>
        <nav className="h-screen w-48 bg-gray-900 p-4">
            <ul className="text-white">
                <li className="text-white mx-4">Dashboard</li>
                <li className="text-white mx-4">History</li>
                <li className="text-white mx-4">Cards</li>
            </ul>
        </nav>
    </div>
)
}

export default SideBar;