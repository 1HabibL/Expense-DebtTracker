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
    const [filteredExpenses, setFilteredExpenses] = useState([])
    const [filtersApplied, setFiltersApplied] = useState(false);
     //edit use states
     const [isEditing, setIsEditing] = useState (false)
     const [editedName, setEditedName] = useState ("")
     const [editedAmount, setEditedAmount] = useState ("")
     const [editedCategory, setEditedCategory] = useState ("")
     const [editedDate, setEditedDate] = useState ("")
     const [editIndex, setEditIndex] = useState(null);


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
    setfilterDate(filterDate);

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
            setfilterDate("");
            setFilteredExpenses([]);
            setFiltersApplied(false);
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
          
           <button className="text-white rounded px-4 bg-blue-500 py-3 mt-4" onClick={handleClick}>New Expense</button>

    
            <form id="expenseDataForm" 
    className={`my-4 shadow-lg rounded-2xl p-4 bg-[#f8f9fa] transform transition-all duration-500 ease-in-out origin-top overflow-hidden
     ${isHidden 
      ? 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none h-0 overflow-hidden'
      : 'opacity-100 translate-y-0 scale-y-100  pointer-events-auto h-auto'
    }`}  
            onSubmit={newExpense} >
            <div id="SectionOne" className='flex'>
                <div id="ExpenseNameDesigns" className='flex flex-col mr-4'>
                    <label id="expense-name" className='pt-4 pb-4'>Expense Name</label>
                    <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} className="outline-1" type="text" name="expenseName" id="expenseName" />
                </div>

                <div id="ExpenseAmountDesigns" className='flex flex-col'>    
                    <label id="amount" className='pt-4 pb-4'>Amount</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} className="outline-1"  type="number" name="amount" id='amount'/>
                </div>

            </div>

            <div id="SectionTwo" className='flex'>
                <div id="ExpenseCategoryDesigns" className='flex flex-col  mr-4'>       
                    <label id="category" className='pt-4 pb-4'>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}className="outline-1"  name="category" id="category">
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

                <div id="ExpenseDateDesigns" className='flex flex-col'>
                    <label id="date" className='pt-4 pb-4'>Date</label>
                    <input value={date} onChange={(e) => setDate(e.target.value)} className="outline-1" type="date" name="date" id="date"/>
                </div>
                </div>

                 <div className="flex" id="SectionThree">
                    <div id="AdditionalNotesDesign" className="flex flex-col">      
                <label id="additionalNotes" className='pt-4 pb-4'>Additional Notes</label>
                <input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="outline-1 w-113" type="text" name="additionalNotes" id="additionalNotes"/>    
                </div>  
                </div>

                <div id="ButtonSection" className='flex pt-4'>
                <button onClick={handleClick} type="submit" className='text-white rounded bg-blue-500  px-3 py-1'>Add Expense</button>
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
        <form className='flex flex-col ml-4 mr-4 items-center justify-center' onSubmit={appliedFilter}>
             <div id="filteringComponents" className='flex'>
            <div id="nameFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Expense Name</label>
        <input id="filterName" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} className='rounded-l shadow-md bg-white focus:outline-none fcous-ring-2'></input>
            </div>

            <div id="categoryFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Category</label>
            <select id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value.toLowerCase())}  className='rounded-l shadow-md bg-white '>
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="health">Health</option>
                <option value="insurance">Insurance</option>
                <option value="education">Education</option>
                <option value="rent">Rent</option>
                <option value="miscellaneous">Miscellaneous</option>
            </select>

          
            </div>
            <div id="dateFilter" className='flex flex-col ml-4 mr-4 mt-1 mb-2'>
            <label className='block text-lg font-medium'>Date</label>
            <input id="filterDate" type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className='rounded-l shadow-md bg-white'></input>
            </div>
            </div>
            <div id="filterFormButtons" className='flex flex-row flex-wrap gap-4 mt-4 mb-4'>
                    <button  type="submit" className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200'>Apply Filters</button>
                    <button type="button" onClick={resetFilters} className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200'>Reset Filters</button>
                </div>
           
        </form>

       
        </div> 

    
            
            <ul className='flex flex-col justify-center items-center w-6/7'>
                { (
                Array.isArray(expenses) && (filteredExpenses.length > 0 ? filteredExpenses : expenses).map((expense, index) => (
                    <li className='text-2xl my-2 flex bg-[#f8f9fa] px-4  py-2 items-center gap-4 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 w-[100%]' key={index}>
                        
                        {editIndex  === index ? (<input className="flex-1 outline w-0.5" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)}></input> 
                          ) : (
                        <div id='displayedExpenseName' className="font-semibold bg-blue-100 flex-1">{expense.expenseName}</div>  
                    )
                    }
                        
                        {editIndex === index ? (<input type="number" className="flex-1 outline w-0.5" value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)}></input> 

                        ) : ( 
                            <div id='displayedAmount' className="bg-purple-100 flex-1">${expense.amount}</div> )}
                       
                        
                        {editIndex === index ? (<select className="flex-1 outline w-0.5" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}> 
                <option value="">No Category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Health">Health</option>
                <option value="Insurance">Insurance</option>
                <option value="Education">Education</option>
                <option value="Rent">Rent</option>
                <option value="Miscellaneous">Miscellaneous</option></select>) : (
                        <div id='displayedCategory' className="bg-yellow-100 flex-1">{expense.category}</div>
                    ) 
                    }
                        {editIndex === index ? (<input type="date" className="flex-1 outline" value={editedDate} onChange={(e) => setEditedDate(e.target.value)}></input>) : (
                        <div id='displayedDate' className="text-md text-gray-500 bg-yellow-100 flex-1">{expense.date}</div> )
                    } 
                        {editIndex === index && isEditing ? (<button className="bg-red-300 text-white p-2 rounded-lg shadow-med hover:bg-red-600 transition flex items-center justify-center"onClick={() => cancelEdit(index)}><span className="material-symbols-outlined">Cancel</span></button>):
                        (<button className="bg-red-300 text-white p-2 rounded-lg shadow-med hover:bg-red-600 transition flex items-center justify-center"onClick={() => handleDelete(index)}><span className="material-symbols-outlined">delete</span></button>)
                    }


                        {editIndex === index && isEditing ? (<button className="bg-green-300 text-white p-2 rounded-lg shadow-med hover:bg-green-600 transition flex items-center justify-center"onClick={() => handleEdit(index)}><span className="material-symbols-outlined">Save</span></button>) :  
                        (<button className="bg-blue-300 text-white p-2 rounded-lg shadow-med hover:bg-blue-600 transition flex items-center justify-center"onClick={() =>handleEditButtonClick(index)}><span className="material-symbols-outlined">edit</span></button>)
                    
                        }
                    
                    </li>
                ))
            )
                }
            </ul>
            </div>
            </div>
        </div>


)

}


export default ExpenseForm;