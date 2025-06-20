"use client"

import React, {useEffect, useState} from 'react';
import ExpenseForm from './expenseform';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function DisplayExpense({expenses}) {
const [expenseDisplay, setExpenseDisplay] = useState();


useEffect(() => {
    console.log("infoData updated:", JSON.stringify(expenses));
    if (Array.isArray(expenses) && expenses.length > 0){
        calculateExpenses(expenses)} else {
            setExpenseDisplay(0)
        }
}, [expenses])


const calculateExpenses = (dataArray) => {
    console.log("Calculating total sum for:", JSON.stringify(dataArray))
    if(!Array.isArray(dataArray || dataArray.length === 0))
    {
        setExpenseDisplay(0)
        return
    }
    const total = dataArray.reduce((total, item) => {
        console.log("pricessing item", item);
        const numberValue = Number(item.amount)

        if(!isNaN(numberValue)){
            return total + numberValue
        }
    return total;}, 0)

    console.log("Calculated total:", total)
    setExpenseDisplay(total)

}

/*function addExpenses(array) {
    let totalSum = array.reduce((total, item) => total + item.amount) 
}*/

return (
<div className="w-full max-w-xl  mx-auto bg-gradient-to-br from-indigo-900 via-purple-800 to-red-700 rounded-3xl shadow-2xl  p-16  mt-20 text-white">
  <h2 className="text-2xl font-medium text-center mb-5 tracking-wide">
    Total Spend
  </h2>

  <p className="text-center text-[5rem] font-light leading-none">
    ${expenseDisplay}
  </p>


</div>

)
}
export default DisplayExpense