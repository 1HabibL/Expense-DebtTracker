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
    <div>
        <form>
            <label>Amount</label>
            <input type="number"></input>
        </form>

        <div id="displayContainer" className='bg-gray-700'>
            <p>{expenseDisplay}</p>  
        </div> 
    </div>
)
}
export default DisplayExpense