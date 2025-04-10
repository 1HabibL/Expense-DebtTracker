"use client";
import {useState} from "react";
import ExpenseForm from "./expenseform";
import NavBar from "./navbar";
import SideBar from "./sideBar";
import DisplayExpense from "./expenseDisplay";


export default function Home() {
const [expenses, setExpenses] = useState([]);


  return(
    <div>
      <NavBar />
      <div className="flex bg-amber-25">
      <SideBar className="" />
      <div className="flex flex-col  w-screen" id="fullExpenseForm">
        <div className="flex flex-col justify-center items-center w-4/4">
      <DisplayExpense  expenses={expenses}/>
      <ExpenseForm  expenses={expenses} setExpenses={setExpenses}/>
      </div>
      </div>
      </div>
    </div>
  )
}