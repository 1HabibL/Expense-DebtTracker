"use client";
import {Component, useEffect, useState} from "react";

import DashBoard from './dashBoard'; 
import ExpenseForm from "./expenseform";
import MonthlyexpenseForm from "./monthlyList";
import InputForm from "./inputForm";
import NavBar from "./navbar";
import SideBar from "./sideBar";
import DisplayExpense from "./expenseDisplay";
import ExpenseAccount from "./expenseAccounts"
import { AccountsProvider } from './context/AccountsContext';



export default function Home() {
const [expenses, setExpenses] = useState([]);
const [designatedComponent, setdesignatedComponent] = useState("home")
const [designatedBaseComponent, setdesignatedBaseComponent] = useState("home")
//const [activeComponent, setActiveComponent] = useState(expenseDisplay);
useEffect(() => {
  if (Array.isArray(expenses) && expenses.length > 0) {
    localStorage.setItem("submittedExpenseData", JSON.stringify(expenses));
  }
}, [expenses]);


const appComponents = [
  {id: "home",component: <DisplayExpense expenses={expenses} /> },
  {id: 'dashboards',component: <DashBoard expenses={expenses} />},
]

const baseComponents = [
  {id: 'history',component: <ExpenseForm expenses={expenses} setExpenses={setExpenses}/>},
  {id: 'home',component: <MonthlyexpenseForm expenses={expenses} setExpenses={setExpenses}/>},
  {id: 'dashboards',component: <MonthlyexpenseForm expenses={expenses} setExpenses={setExpenses}/>},
  {id: 'accounts',component: <ExpenseAccount expenses={expenses} setExpenses={setExpenses} />}
]

const forms = [
  {id:'history',component: <InputForm expenses={expenses} setExpenses={setExpenses}/>},
   {id:'home',component: <InputForm expenses={expenses} setExpenses={setExpenses}/>},
   {id:'dashboards',component: <InputForm expenses={expenses} setExpenses={setExpenses}/>},
   {id:'accounts',component: <InputForm expenses={expenses} setExpenses={setExpenses}/>},

]

const decidedComponent = appComponents.filter((compDisplay) => compDisplay.id == designatedComponent)
const decidedBaseComponent = baseComponents.filter((bodyDisplay) => bodyDisplay.id == designatedComponent)
const decidedFormComponent =  forms.filter((formsDisplay) =>  formsDisplay.id == designatedComponent)

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

return(
    <div className="bg-[#f8f9fa]">
       <AccountsProvider>
      <NavBar />
        <div className="flex relative">
        <SideBar  designatedComponent={designatedComponent} setdesignatedComponent={setdesignatedComponent} />
          {/*COMPONENT A1 */}           {/*COMPONENT A1 */}           {/*COMPONENT A1 */}
          <div className="flex flex-col w-screen z-10 relative" id="fullExpenseForm">
              <div className="flex flex-col w-4/4">
              <div id='mainDisplay' className="w-full">
               {
               decidedComponent.map(({id, component}) =>
              <div key={id}>{component}</div>
              )
              }
              </div>

                <div id="expenseFormContainer" className="ml-20 h-full mr-10 flex">
              
              {
               decidedBaseComponent.map(({id, component}) =>
              <div id="baseComponent"className="w-3/4"  key={id}>{component}</div>
              )
              }
                  <div className="ml-auto mt-13">

                    {
               decidedFormComponent.map(({id, component}) =>
              <div id="baseComponent"className="w-3/4" key={id}>{component}</div>
              )
              }
                  </div>
                </div>
                </div>
            </div>
          {/*COMPONENT A1 */}           {/*COMPONENT A1 */}          {/*COMPONENT A1 */}          
        </div>
        </AccountsProvider>
    </div>
  )
}















//<div className="absolute top-0 left-48 w-[30%] h-[100%]  bg-gradient-to-r from-purple-700 via-red-500 to-white z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
  // <DisplayExpense id="expenseDisplay"  expenses={expenses}/>
  //<DashBoard id="expenseDashboard" expenses={expenses}/>

  //{`${ designatedComponent === "history" ? "h-full" : "h-full"} bg-amber-400 w-3/4`}