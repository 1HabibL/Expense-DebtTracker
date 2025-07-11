"use client";

import React, { useEffect, useState } from 'react';
import ExpenseForm from "./expenseform";

function InputForm({ expenses, setExpenses }) {
    //const [expenses, setExpenses] = useState([])
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("")
    const [category, setCategory] =useState("")
    const [date, setDate] = useState("")
    const [additionalNotes, setAdditionalNotes] = useState("")
    const [isHidden,setIsHidden] = useState(true)
    const [filterIsHidden, setFilterIsHidden] = useState(true)

//function for hiding and veiwing expense form
const handleClick = () => {
    setIsHidden(!isHidden)
};
const handleClickFilter = () => {
    setFilterIsHidden(!filterIsHidden)
}

//save  expense forms isHidden state to localStorage
useEffect(() => {
    localStorage.setItem("formHidden", JSON.stringify(isHidden));
}, [isHidden]);

//save filter forms isHidden state to localStorage

//load stored data from localStorage
useEffect(() => {
    const savedData = localStorage.getItem("submittedExpenseData");
    if (savedData) {
        setExpenses(JSON.parse(savedData))
    }

const storedVisibility = localStorage.getItem("formHidden");
if (storedVisibility !== null) {
    setIsHidden(JSON.parse(storedVisibility))
}

}, []);

//Update localstorage whenever expenses changes
useEffect(() => {
    localStorage.setItem("submittedExpenseData", JSON.stringify(expenses))
}, [expenses])

//function to clear form inputes
    const clearedExpense = () => {
        setAmount("");
        setCategory("");
        setDate("");
        setAdditionalNotes("");
        setExpenseName("");
     }
//function to handle form submission
        const newExpense = (event) => {
            event.preventDefault(); //

            const passedData = {
            expenseName: expenseName,
            amount: amount,
            category: category,
            date: date,
            additionalNotes: additionalNotes
        }

        setExpenses((prevData) => [...prevData, passedData])
         clearedExpense()

         console.log("expenses array:",expenses)
        }
 
//function to clear all stored data
const clearData = () =>{
    localStorage.removeItem("submittedExpenseData")
    setExpenses([]);
}
        //localStorage code

 //Function to edit Expenses in Expense LIst

    return (
        <div>
             <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>
<form
  id="expenseDataForm"
  className="bg-white shadow-xl rounded-2xl p-5 w-[28rem]"
  onSubmit={newExpense}
>
  <h1>Add New Expense</h1>
  {/* Section 1 */}

    <div className="flex flex-col">
      <label htmlFor="expenseName" className="text-sm font-medium text-gray-700 mb-2">
        Expense Name
      </label>
      <input
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        type="text"
        name="expenseName"
        id="expenseName"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. Coffee, Rent"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2">
        Amount
      </label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        name="amount"
        id="amount"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. 25.00"
      />
    </div>

  {/* Section 2 */}
  <div className="grid md:grid-cols-2 gap-6 mb-4">
    <div className="flex flex-col">
      <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name="category"
        id="category"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Insurance">Insurance</option>
        <option value="Education">Education</option>
        <option value="Rent">Rent</option>
        <option value="Rent">Finance/interest Charges</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2">
        Date
      </label>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        name="date"
        id="date"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  </div>

  {/* Section 3 */}
  <div className="mb-4">
 <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Account
    </label>
   <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name="category"
        id="category"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Insurance">Insurance</option>
        <option value="Education">Education</option>
        <option value="Rent">Rent</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Additional Notes
    </label>
    <input
      value={additionalNotes}
      onChange={(e) => setAdditionalNotes(e.target.value)}
      type="text"
      name="additionalNotes"
      id="additionalNotes"
      className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Optional"
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4">
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={handleClick}
    >
      Add Expense
    </button>
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Cancel
    </button>
  </div>
</form>
   {/* EXPENSE LIST STARTES HERE */}

  {/* EXPENSE LIST STARTES HERE */} 
      </div>
)
}

export default InputForm;


