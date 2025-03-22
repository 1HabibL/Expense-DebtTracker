"use client";

import React, { useEffect, useState } from 'react';

function ExpenseForm() {
    const [expenses, setExpenses] = useState([])
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("")
    const [category, setCategory] =useState("")
    const [date, setDate] = useState("")
    const [additionalNotes, setAdditionalNotes] = useState("")


//load stored data from localStorage

useEffect(() => {
    const savedData = localStorage.getItem("submittedExpenseData");
    if (savedData){
        setExpenses(JSON.parse(savedData))
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

        setExpenses([...expenses, passedData])
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
        <div>
            <p>Expense Form</p>
            <form onSubmit={newExpense} >
            <label id="expense-name">Expense Name</label>
            <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} className="outline-1" type="text" name="expenseName" id="expenseName" />
            <label id="amount">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="outline-1"  type="number" name="amount" id='amount'/>
            <label id="category">Category</label>
            <select onChange={(e) => setCategory(e.target.value)}className="outline-1"  name="category" id="category">
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
                <label id="date">Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} className="outline-1" type="date" name="date" id="date"/>         
                <label id="additionalNotes">Additional Notes</label>
                <input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="outline-1" type="text" name="additionalNotes" id="additionalNotes"/>  
                <button type="submit">Submit</button>     
            </form>

            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.expenseName} - ${expense.amount} ({expense.category})
                        <button onClick={clearData}>Delete</button>
                    </li>
                    
                ))}
            </ul>
       
        </div>


)

}



export default ExpenseForm;