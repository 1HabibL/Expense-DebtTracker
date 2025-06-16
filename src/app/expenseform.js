"use client";

import React, { useEffect, useState } from 'react';

function ExpenseForm({ expenses, setExpenses }) {
    //const [expenses, setExpenses] = useState([])
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("")
    const [category, setCategory] =useState("")
    const [date, setDate] = useState("")
    const [additionalNotes, setAdditionalNotes] = useState("")
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

     //Applied Filter UI Categories
     const [displayUIFilters, setdisplayUIFilters] = ("")
     const [filterNameUI, setfilterNameUI] = useState ("")
     const [filterCategoryUI, setfilterCategoryUI] = useState ("")
     const [filterDateUI, setDateUI] = useState ("")


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

//Update localstorage whenever expenses changes
useEffect(() =>{
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
 
    return (
        <div className='flex my-5 flex-col justify-center items-center w-1/3 overflow-hidden'>
             <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>
            
            <div className={`w-full flex flex-col items-center transition-all duration-500 ease-in-out ${isHidden ? "gap-4" : "gap-12"}`} id="newExpenseFormAndExpenseListContainer">
          
           <button className="text-white rounded px-4 bg-blue-500 py-3" onClick={handleClick}>New Expense</button>
           <form
  id="expenseDataForm"
  className={`bg-white shadow-xl rounded-2xl p-5 transition-all duration-500 ease-in-out transform origin-top overflow-hidden
    ${isHidden
      ? 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none h-0'
      : 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto h-auto'
    }`}
  onSubmit={newExpense}
>
  {/* Section 1 */}
  <div className="grid md:grid-cols-2 gap-6 mb-4">
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

<div
  id="expenseTextList"
  className="my-8 w-full max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
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
    {(Array.isArray(expenses) ? 
    (filteredExpenses.length > 0 ? filteredExpenses : 
      (filtersStatus && filteredExpenses.length == 0 ? [] : expenses) 
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
        </div>


)

}


export default ExpenseForm;


