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
    const [filterDate, setfilterDate] = useState("")
    const [filteredExpenses, setFilteredExpenses] = useState("")

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
        const newExpense =  (event) => {
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

        const appliedFilter = () => {

            
        }

    return (
        <div className='flex my-5 flex-col justify-center items-center w-1/3 overflow-hidden'>
             <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>
          
           <button className="text-white rounded px-4 bg-blue-500 py-3 mt-4" onClick={handleClick}>Add Expense</button>
            
            <form id="expenseDataForm" className={`my-4 shadow-md rounded p-4 bg-white transform transition-all duration-500 ease-in-out origin-top
     ${isHidden 
      ? 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none max-h-0'
      : 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto'
    }`}  
            onSubmit={newExpense} >
                <div id="mainComponents" className='p-4'>
            <label id="expense-name" className='p-4'>New Expense</label>
            <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} className="outline-1" type="text" name="expenseName" id="expenseName" />
            <label id="amount" className='p-4'>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="outline-1"  type="number" name="amount" id='amount'/>
            <label id="category" className='p-4'>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}className="outline-1"  name="category" id="category">
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
                <label id="date" className='p-4'>Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} className="outline-1" type="date" name="date" id="date"/>
                </div>

                 <div className="" id="additionalComponent">        
                <label id="additionalNotes" className='p-4'>Additional Notes</label>
                <input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="outline-1 w-113" type="text" name="additionalNotes" id="additionalNotes"/>  
                <button onClick={handleClick} type="submit" className='text-white rounded bg-blue-500 ml-4 px-3 py-1'>Add Expense</button>
                <button type="button" onClick={handleClick} className='text-white rounded bg-red-500 ml-4 px-3 py-1'>Cancel</button>       
                </div>
            </form>
            

        <div className="my-4 w-99/100 bg-[#f8f9fa] flex flex-col shadow-lg justify-center items-center rounded-lg p-6" id='expenseTextList'>
        <div className='flex w-99/100 '>
        <h1 className="self-start ml-14 mt-4 mb-4 font-semibold text-3xl">Expenses</h1>
        <button className="ml-auto text-xl mr-14 p-4 my-2 bg-gray-300 rounded-lg hover:bg-gray-600 text-white shadow-md transition flex items-center justify-center" onClick={handleClickFilter} id="resetFilterBtn"><span className="material-symbols-outlined text-2xl">filter_alt</span></button>
        </div>  
        <div id="filterFormContainer" className={`bg-[#f8f9fa] shadow-lg rounded-2xl w-8/10 flex flex-col items-center
        ${filterIsHidden
            ? 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none max-h-0'
            : 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto'

        }`}>
        <form className='flex ml-4 mr-4 justify-center'>
             
            <div id="nameFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Expense Name</label>
            <input type="text" className='rounded-l shadow-md bg-white focus:outline-none fcous-ring-2'></input>
            </div>

            <div id="categoryFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Category</label>
            <select id="expenseCategory" className='rounded-l shadow-md bg-white '>
                <option value="all">All</option>
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
            <div id="dateFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Date</label>
            <input type="date" className='rounded-l shadow-md bg-white'></input>
            </div>
           
        </form>

        <div id="filterFormButtons" className='flex flex-row flex-wrap gap-4 mt-4 mb-4'>
                    <button type="button" className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200'>Apply Filters</button>
                    <button type="button" className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200'>Reset Filters</button>
                </div>
        </div> 

    
            
            <ul className='flex flex-col justify-center items-center w-6/7'>


                
                
                
                
                {Array.isArray(expenses) && expenses.map((expense, index) => (
                    <li className='text-2xl my-2 flex bg-[#f8f9fa] px-4  py-2 items-center gap-4 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 w-[100%]' key={index}>
                        <div className="font-semibold bg-blue-100 flex-1">{expense.expenseName}</div>  
                        <div className="bg-purple-100 flex-1">${expense.amount}</div> 
                        <div className="bg-yellow-100 flex-1">{expense.category}</div> 
                        <div className="text-md text-gray-500 bg-yellow-100 flex-1">{expense.date}</div> 
                        <button className="bg-red-300 text-white p-2 rounded-lg shadow-med hover:bg-red-600 transition flex items-center justify-center"onClick={() => handleDelete(index)}><span className="material-symbols-outlined">delete</span></button>
                    </li>
                    
                ))}





            </ul>
            </div>
        </div>


)

}

export default ExpenseForm;