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
      <div class="flex">
      <SideBar />
      <DisplayExpense expenses={expenses}/>
      <ExpenseForm expenses={expenses} setExpenses={setExpenses}/>
      </div>
    </div>
  )
}