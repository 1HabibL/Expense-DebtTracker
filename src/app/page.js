"use client";
import {Component, useEffect, useState} from "react";

import DashBoard from './dashBoard'; 
import ExpenseForm from "./expenseform";
import MonthlyexpenseForm from "./monthlyList";
import InputForm from "./inputForm";
import NavBar from "./navbar";
import SideBar from "./sideBar";
import DisplayExpense from "./expenseDisplay";


export default function Home() {
const [expenses, setExpenses] = useState([]);
const [designatedComponent, setdesignatedComponent] = useState("home")
//const [activeComponent, setActiveComponent] = useState(expenseDisplay);
const [displaySum, setdisplaySum] = useState(true)
const [displayDashboard, setdisplayDashboard ] = useState(false)
const [displayCards, setdisplayCards ] = useState(false)

const appComponents = [
  {
    id: "home",
    component: <DisplayExpense expenses={expenses} />
  },

  {
    id: 'dashboards',
    component: <DashBoard expenses={expenses} />
  }
]

const decidedComponent = appComponents.filter((compDisplay) => compDisplay.id == designatedComponent)

useEffect(() => {
  const targetComponent = localStorage.getItem("targetComponent");
  if (targetComponent){
    setdesignatedComponent(targetComponent)
  }
}, [])

//Save components whenever it changes
useEffect(() => {
  localStorage.setItem('targetComponent', designatedComponent)
}, [designatedComponent])

//<div className="absolute top-0 left-48 w-[30%] h-[100%]  bg-gradient-to-r from-purple-700 via-red-500 to-white z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
  // <DisplayExpense id="expenseDisplay"  expenses={expenses}/>
  //<DashBoard id="expenseDashboard" expenses={expenses}/>
return(
    <div className="bg-[#f8f9fa]">
    
      <NavBar />
        <div className="flex relative">
        <SideBar designatedComponent={designatedComponent} setdesignatedComponent={setdesignatedComponent} />
        
          <div className="flex flex-col w-screen z-10 relative" id="fullExpenseForm">
              <div className="flex flex-col w-4/4">
              <div id='mainDisplay' className="w-full">
               {
               decidedComponent.map(({id, component}) =>
              <div key={id}>{component}</div>
              )
              }
              </div>
                <div id="expenseFormContainer" className="ml-24 mr-21 flex">
                  <ExpenseForm  expenses={expenses} setExpenses={setExpenses}/>

                   <MonthlyexpenseForm  expenses={expenses} setExpenses={setExpenses}/>

                  <div className="ml-auto mt-13">
                  <InputForm  expenses={expenses} setExpenses={setExpenses}/>
                  </div>
                </div>
                </div>
            </div>
          
          
        </div>
    </div>
  )
}