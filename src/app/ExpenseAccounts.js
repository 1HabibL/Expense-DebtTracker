"use client"

import React, { useEffect, useState } from "react"

function ExpenseAccount(){
    const [account, setAccounts] = useSate([])
    const [accountName, setaccountName] = useState("")
    //Bank Account info
    const [transitNumber, settransitNumber] = useState("")
    const [financialInstitution, setfinancialInstitution] = useState("")
    const [institutionNUmber, setinstitutionNumber] = useState("")
    //credit card Info
    const[creditCardNumber, setcreditCardNumber] = useState("")
    const [credtCardType, setcreditCardType] = useState ("")


function newAccount = (event) => {
    event.preventDefault();
    const passedAccount 
}



return(<div>
   <h1 className="text-2xl font-bold text-gray-800">Expense Accounts</h1>
      {/* Add account features here */}
    
    </div>)

} 