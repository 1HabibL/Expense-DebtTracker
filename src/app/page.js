"use client";

import ExpenseForm from "./expenseform";
import NavBar from "./navbar";
import SideBar from "./sideBar";

export default function Home() {
  return(
    <div>
      <NavBar />
      <div class="flex">
      <SideBar />
      <ExpenseForm />
      </div>
    </div>
  )
}