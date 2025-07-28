import ExpenseForm from "./expenseform";
import ExpenseAccount from "./expenseAccounts";
import { useAccounts } from './context/AccountsContext';

export function accountBalance(expenseArray, accountArray){
for (let k = 0; k < accountArray.length; k++) {

let startingBalance = 0
     
  for (let i = 0; i < expenseArray.length; i++) {

    if (expenseArray[i].account === accountArray[k].accountName){
    if(accountArray[k].accountType === 'credit'){
    
    startingBalance = startingBalance + parseInt(expenseArray[i].amount)
    accountArray[k].balance = startingBalance
 
    } else {
         let startingBalance = parseInt(accountArray[k].balance) 
    startingBalance = startingBalance - parseInt(expenseArray[i].amount)
        accountArray[k].balance = startingBalance 
    }
}

  }
}
}