"use client"

import React, {useEffect, useState} from 'react';
import ExpenseForm from './expenseform';
import {monthlySums, convertDates, getWeekOf, weeklySums, annualSums, todaysSums, normalizeDate} from './TotalSum.js'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function DisplayExpense({expenses}) {
const [expenseDisplay, setExpenseDisplay] = useState();
const [date, setDate] = useState(new Date())


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
let todaysDate = new Date()
let todayFormatted = todaysDate.toLocaleDateString("en-US",{month: "long", day: "numeric", year: "numeric"})
let todayMonthFormatted = todaysDate.toLocaleDateString("en-US",{month: "long", year: "numeric"})
let todayYearFormatted = todaysDate.toLocaleDateString("en-US",{year: "numeric"})
 let presentMonthSum = monthlySums(expenses)
 console.log('PRESENT MONTHS SUM', presentMonthSum)
let weeklyAmount = weeklySums(expenses, todaysDate)
 let annualAmount = annualSums(expenses, todaysDate)
 let todaysAmount = todaysSums(expenses, todaysDate)
return (
<div className="w-full py-10 bg-gray-50">
  <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">💸 Expense Dashboard</h1>

  <div className="flex flex-col lg:flex-row justify-center gap-10 px-6">

    {/* Left: Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-3/4">

      {/* Total Spend */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">All time Spending</h2>
        <p className="text-6xl font-bold text-green-500">${expenseDisplay}</p>
      </div>

      {/* Annual Debt */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Annual Expense</h2>
        <p className="text-5xl font-bold text-red-400">${annualAmount[1].annualAmount}</p>
          <p className="text-xl font-bold">{todayYearFormatted}</p>
      </div>

      {/* Monthly Expense */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Monthly Expense</h2>
        <p className="text-4xl font-bold text-blue-500">${presentMonthSum[0].amount}</p>
        <p className="text-xl font-bold">{todayMonthFormatted}</p>

      </div>

      {/* Weekly Expense */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Weekly Expense</h2>
        <p className="text-4xl font-bold text-blue-400">${weeklyAmount[1].weeklyAmount}</p>
        <p className="text-xl font-bold">{weeklyAmount[0].startingDay} - {weeklyAmount[0].endingDay}</p>
      </div>

      {/* Today's Spending */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Today's Spending</h2>
        <p className="text-4xl font-bold text-purple-500">${todaysAmount[1].todaysAmount}</p>
        <p className="text-xl font-bold">{todayFormatted}</p>

      </div>

      {/* Total Debt */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Total Debt</h2>
        <p className="text-4xl font-bold text-red-500">W.I.P</p>
        <p className="text-xl font-bold">Credit Cards, Line of Credit, etc..</p>
      </div>
    </div>

    {/* Right: Calendar */}
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full lg:max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">📅 Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="react-calendar !border-none w-full"
      />
      <p className="mt-4 text-center text-gray-600">
        Selected date: <span className="font-medium text-gray-800">{date.toDateString()}</span>
      </p>
    </div>
  </div>
</div>

)
}
export default DisplayExpense

/*function addExpenses(array) {
    let totalSum = array.reduce((total, item) => total + item.amount) 
}*/

//text-white bg-gradient-to-br from-indigo-900 via-purple-800 to-red-700
