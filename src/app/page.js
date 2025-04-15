"use client";
import {useState} from "react";
import ExpenseForm from "./expenseform";
import NavBar from "./navbar";
import SideBar from "./sideBar";
import DisplayExpense from "./expenseDisplay";


export default function Home() {
const [expenses, setExpenses] = useState([]);


//
  return(
    <div className="bg-[#f8f9fa]">
      <NavBar />
        <div className="flex relative">
        <SideBar  />
          <div className="absolute top-0 left-48 w-[30%] h-[100%]  bg-gradient-to-r from-purple-700 via-red-500 to-white z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
          </div>
          <div className="flex flex-col w-screen z-10 relative" id="fullExpenseForm">
              <div className="flex flex-col justify-center items-center w-4/4">
                <DisplayExpense  expenses={expenses}/>
                <ExpenseForm  expenses={expenses} setExpenses={setExpenses}/>
                </div>
            </div>
          
          
        </div>
    </div>
  )
}