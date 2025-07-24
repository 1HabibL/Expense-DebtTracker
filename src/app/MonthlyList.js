"use client";

import React, { useEffect, useState } from 'react';
import InputForm from './inputForm';

function MonthlyexpenseForm({ expenses, setExpenses }) {
    //const [expenses, setExpenses] = useState([])
    const [expensesMonthly, setexpensesMonthly] = useState([])
    const [isHidden,setIsHidden] = useState(true)
    const [filterIsHidden, setFilterIsHidden] = useState(true)
    //filter use states
    const [filterName, setFilterName] = useState("")
    const [filterCategory, setFilterCategory] = useState("")
    const [filterDate, setFilterDate] = useState("")
    const [filteredExpenses, setFilteredExpenses] = useState([])
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filtersStatus, setfiltersStatus] = useState(false);
     //filter use states
     //edit use states
     const [isEditing, setIsEditing] = useState (false)
     const [editedName, setEditedName] = useState ("")
     const [editedAmount, setEditedAmount] = useState ("")
     const [editedCategory, setEditedCategory] = useState ("")
     const [editedDate, setEditedDate] = useState ("")
     const [editIndex, setEditIndex] = useState(null);
     //designatedArray
     const [currentMonthExp, setCurrentMonthExp] = useState([])
     const [monthCounter, setMonthCounter] = useState(0)
     const todaysDate = new Date();

     const formattedTD = todaysDate.toLocaleDateString("en-US",{
    month: "long",
    year: "numeric"
})
//console.log("todaysDate:",todaysDate)

const incrementMonth = () => setMonthCounter(prev => prev + 1)
const decrementMonth = () => setMonthCounter(prev => prev - 1)

    const formattedTodaysMonth = todaysDate.toLocaleDateString("en-US",{
    year: "numeric",
    month: "long"
    })
    //console.log("formattedTodaysMonth", formattedTodaysMonth)

    let nextMonthPreperation = new Date(`${formattedTodaysMonth}-01`)
  //console.log("nextMonthPreperation", nextMonthPreperation)
    nextMonthPreperation.setMonth(nextMonthPreperation.getMonth() + (monthCounter))

const formattedDesignatedMonths = nextMonthPreperation.toLocaleDateString("en-US",{
    year: "numeric",
    month: "long"
    })
    //console.log("formattedDesignatedMonths:", formattedDesignatedMonths)
        function checkDate(targetExp){
        const processedEXPdate = new Date(targetExp)
        const formattedExpenseMonth = processedEXPdate.toLocaleDateString("en-US",{
            year: "numeric",
            month: "long"
        })
        //console.log("formattedExpenseMonth:", formattedExpenseMonth)
        return formattedExpenseMonth
    }

//function for hiding and veiwing filter form
const handleClickFilter = () => {
    setFilterIsHidden(!filterIsHidden)
}

//load stored data from localStorage
useEffect(() => {
    const savedData = localStorage.getItem("submittedExpenseData");
    if (savedData) {
        setExpenses(JSON.parse(savedData))
    }

const savedFilters = localStorage.getItem("expenseFilter");
if(savedFilters){
    const {filterName, filterCategory, filterDate} = JSON.parse(savedFilters);
    setFilterName(filterName);
    setFilterCategory(filterCategory);
    setFilterDate(filterDate);
      // Reapply filter logic
      const parsedExpenses = savedData ? JSON.parse(savedData) : [];
}
}, []);

 //function to delete selected expense 
  const handleDelete = (index) => {
            const newExpenses = expenses.filter((_, i) => i !== index);
            setExpenses(newExpenses)
        } 
//function to clear all stored data
const clearData = () =>{
    localStorage.removeItem("submittedExpenseData")
    setExpenses([]);
}
        //localStorage code
        //Function to filter
        const appliedFilter = (event) => {
            event.preventDefault(); // Prevent page reload
            setfiltersStatus(true)
            const anyFilterApplied = filterName || filterCategory || filterDate;
            setFiltersApplied(anyFilterApplied);
            localStorage.setItem("expenseFilter", JSON.stringify({
                filterName,
                filterCategory,
                filterDate
            }))
            const fullyfilteredExpenses = expenses.filter((x) => {
            return(!filterName || x.expenseName.toLowerCase() === filterName.toLowerCase()) &&
            (!filterCategory || x.category.toLowerCase() === filterCategory.toLowerCase()) &&
            (!filterDate || x.date === filterDate)
            }
        )
        setFilteredExpenses(fullyfilteredExpenses)
        }
        const resetFilters = () => {
            setFilterName("");
            setFilterCategory("");
            setFilterDate("");
            setFilteredExpenses([]);
            setFiltersApplied(false);
            setfiltersStatus(false);
            localStorage.removeItem("expenseFilter")
        };
 //Function to edit Expenses in Expense LIst
 const handleEdit = (index) => {
    // Copy of current expenses array
    const updatedExpenses = [...expenses];
// replacing the specific item at the given index with updated values
updatedExpenses[index] = {
expenseName: editedName,
amount: editedAmount,
category: editedCategory,
date: editedDate,
}
  setExpenses(updatedExpenses)
 setIsEditing(false)
 setEditIndex(null)  
}
//function so user sees original inputs in the textboxes during editing
const handleEditButtonClick = (index) => {
    const selectedExpense = expenses[index];
    setEditedName(selectedExpense.expenseName);
    setEditedAmount(selectedExpense.amount);
    setEditedCategory(selectedExpense.category);
    setEditedDate(selectedExpense.date);
    setEditIndex(index);
    setIsEditing(true);
}
const cancelEdit = (index) => {
    // Copy of current expenses array
    setIsEditing(false);
  setEditIndex(null);
}
//Filters expenses to only display expenses of current
useEffect(() => {
  const monthlyExpenses = expenses.filter(exp => 
    checkDate(exp.date) === formattedDesignatedMonths
  );
  setCurrentMonthExp(monthlyExpenses)
},[expenses,formattedDesignatedMonths,monthCounter]);

    return (
        <div className='w-full'>
             <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>
            
  {/* EXPENSE LIST STARTES HERE */}
  
  {/* EXPENSE LIST STARTES HERE */}

<div
  id="expenseTextList"
  className="my-8 w-full bg-white shadow-xl rounded-3xl p-8"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>

<button onClick={() => setMonthCounter(prev => prev - 1)}>prev</button>
<span className="material-symbols-outlined">
arrow_back_ios
</span>

<h1 className="text-3xl font-bold text-gray-800">{formattedDesignatedMonths}</h1>

<span className="material-symbols-outlined">
arrow_forward_ios
</span>
<button onClick={() => setMonthCounter(prev => prev + 1)}>forward</button>

    <button
      onClick={handleClickFilter}
      id="resetFilterBtn"
      className="p-3 rounded-xl bg-gray-200 hover:bg-gray-800 text-gray-800 hover:text-white transition flex items-center shadow-md"
    >
      <span className="material-symbols-outlined text-xl">filter_alt</span>
    </button>
  </div>

  {/* Filter Form */}
  <div
    id="filterFormContainer"
    className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
      filterIsHidden
        ? "opacity-0 -translate-y-4 scale-y-95 pointer-events-none max-h-0"
        : "opacity-100 translate-y-0 scale-y-100 pointer-events-auto max-h-[500px]"
    }`}
  >
    <form
      onSubmit={appliedFilter}
      className="bg-gray-100 rounded-2xl p-6 shadow-inner mb-8"
    >
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Filter: Name */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="mb-2 text-gray-700 font-medium">Expense Name</label>
          <input
            id="filterName"
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* Filter: Category */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="mb-2 text-gray-700 font-medium">Category</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value.toLowerCase())}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="">Select</option>
            {[
              "Food",
              "Transportation",
              "Entertainment",
              "Utilities",
              "Health",
              "Insurance",
              "Education",
              "Rent",
              "Miscellaneous",
            ].map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Filter: Date */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="mb-2 text-gray-700 font-medium">Date</label>
          <input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end mt-6">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl shadow-md transition"
          onClick={handleClickFilter}
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl shadow-md transition"
        >
          Reset
        </button>
      </div>
    </form>
  </div>

  {/*Applied FILTERS UI */}
  <div id="displayableFilters">
  {filtersApplied && (
  <div className="flex flex-wrap gap-3 my-4">
    {filterName && (
      <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-sm">
        Name: {filterName}
      </div>
    )}
    {filterCategory && (
      <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full shadow-sm">
        Category: {filterCategory}
      </div>
    )}
    {filterDate && (
      <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full shadow-sm">
        Date: {filterDate}
      </div>
    )}
  </div>
)}
</div>


 {/*Applied FILTERS UI */}
  {/* Expense List */}
  <div className="max-h-[400px] overflow-y-auto space-y-4">
    <ul className="space-y-4">
    {(Array.isArray(currentMonthExp) ? 
    (filteredExpenses.length > 0 ? filteredExpenses : 
      (filtersStatus && filteredExpenses.length == 0 ? [] : currentMonthExp) 
    ):( 
      
      [])).map((expense, index) => (
        <li
          key={index}
          className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-wrap items-center gap-4"
        >
          {/* Name */}
          {editIndex === index ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <div className="flex-1 min-w-[120px] font-medium text-blue-800">
              {expense.expenseName}
            </div>
          )}

          {/* Amount */}
          {editIndex === index ? (
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <div className="flex-1 min-w-[100px] text-purple-700 font-semibold">
              ${expense.amount}
            </div>
          )}

          {/* Category */}
          {editIndex === index ? (
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-lg"
            >
              <option value="">No Category</option>
              {[
                "Food",
                "Transportation",
                "Entertainment",
                "Utilities",
                "Health",
                "Insurance",
                "Education",
                "Rent",
                "Miscellaneous",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex-1 min-w-[120px] text-yellow-800">
              {expense.category}
            </div>
          )}

          {/* Date */}
          {editIndex === index ? (
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="flex-1 min-w-[130px] p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <div className="flex-1 min-w-[130px] text-gray-500">
              {expense.date}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            {editIndex === index && isEditing ? (
              <>
                <button
                  onClick={() => cancelEdit(index)}
                  className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-300 hover:bg-red-600 text-white p-2 rounded-xl transition"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <button
                  onClick={() => handleEditButtonClick(index)}
                  className="bg-blue-300 hover:bg-blue-600 text-white p-2 rounded-xl transition"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>    
        </div>
)

}


export default MonthlyexpenseForm;


