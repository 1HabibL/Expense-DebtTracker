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
//function for hiding and veiwing expense form
const handleClick = () => {
    setIsHidden(!isHidden)
};

//save isHidden state to localStorage
useEffect(() => {
    localStorage.setItem("formHidden", JSON.stringify(isHidden));
}, [isHidden]);

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

        setExpenses((prevData) => [...expenses, passedData])
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

    return (
        <div className='flex flex-col justify-center items-center bg-blue-300 w-1/3 overflow-hidden'>
          
           <button className="text-white rounded px-4 bg-blue-500  py-3" onClick={handleClick}
           >Add Expense</button>
           {isHidden !== null && (
            <form className={`my-4 shadow-md rounded p-4 bg-white transform transition-all duration-500 ease-in-out origin-top
     ${isHidden 
      ? 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
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
            
)}
        <div className="my-4 bg-gray-100 rounded" id='expenseTextList'>
            <ul>
                {Array.isArray(expenses) && expenses.map((expense, index) => (
                    <li className='text-2xl flex bg-[#f8f9fa] px-4 py-2 items-center gap-4 shadow-md' key={index}>
                        <div className="bg-blue-100 flex-1">{expense.expenseName}</div>  
                        <div className="bg-purple-100 flex-1">${expense.amount}</div> 
                        <div className="bg-yellow-100 flex-1">{expense.category}</div> 
                        <div className="bg-yellow-100 flex-1">{expense.date}</div> 
                        <button className="bg-red-300 rounded flex-1"onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                    
                ))}
            </ul>
            </div>
        </div>


)

}

export default ExpenseForm;