"use client"

import React, { useEffect, useState } from "react";

function sideBar() {
return(
    <div>
        <nav className="bg-blue-900 p-4">
            <ul className="flex justify-end text-white">
                <li className="text-white mx-4">Home</li>
                <li className="text-white mx-4">Notifications</li>
                <li className="text-white mx-4">Sign Up</li>
            </ul>
        </nav>
    </div>
)
}

export default sideBar;