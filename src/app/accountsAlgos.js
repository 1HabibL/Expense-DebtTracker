import ExpenseForm from "./expenseform";
import ExpenseAccount from "./expenseAccounts";
import { useAccounts } from './context/AccountsContext';

export function accountBalance(expenseArray, accountArray){
  //CYCLE THROUGH ACCOUNTS
for (let k = 0; k < accountArray.length; k++) {
  
     let startingBalance = 0
     let fundsIn = 0
     let fundsOut = 0
     let hasExpenses = false;
      
  //CYCLE TRHOUGH EACH EXPENSE FOR CURRENT ACCOUNT   
  for (let i = 0; i < expenseArray.length; i++) {
//CHECK IF THE ACCOUNT USED FOR THE EXPENSE MATCHES THE CURRENT EXPENSE
    if (expenseArray[i].account === accountArray[k].accountName){
      hasExpenses = true;
      //CHECK IF THE ACCOUNT IS CREDIT TYPE OR DEBIT TYPE
      if(accountArray[k].accountType === 'credit'){
      startingBalance = startingBalance + parseInt(expenseArray[i].amount)
      accountArray[k].balance = startingBalance
  
      } else {
          let startingBalance = parseInt(accountArray[k].balance) 
          fundsOut = fundsOut + parseInt(expenseArray[i].amount)
          accountArray[k].moneyOut = fundsOut
          accountArray[k].updatedBalance = startingBalance - fundsOut
      }
}
  }

    if(!hasExpenses){
  if(accountArray[k].accountType === 'credit'){
    accountArray[k].balance = 0
  } else if (accountArray[k].accountType === 'bank'){
    accountArray[k].updatedBalance = undefined;
    accountArray[k].moneyOut = 0
  }
}



}


console.log(accountArray)
}