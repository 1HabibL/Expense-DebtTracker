"use client"

import React, {useEffect, useState} from 'react';
import ExpenseForm from './expenseform';

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
    <div className='bg-[#f8f9fa] w-200 h-100 shadow-lg rounded-2xl'>
        <p className='text-2xl mt-3.5 ml-3.5 bold font-medium'>Total Spend</p>  
    <div id="mainDiv" className='flex flex-col items-center justify-center mt-5 h-50'>
        <div id="displayContainer" className='w-100 rounded  flex items-center  flex-col'>
        <p className='text-2xl'>Total</p>  
            <p className='text-7xl'>{expenseDisplay}</p>  
        </div> 
    </div>
    </div>
)
}
export default DisplayExpense