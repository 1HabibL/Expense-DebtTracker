"use client"

import React, { useEffect, useState } from "react"
import BankForm from "./bankForm"
import CreditForm from "./creditForm"

function ExpenseAccount(){
  const [designatedAccount, setdesignatedAccount] =useState(null)
    const [account, setAccounts] = useState([])
    const [accountName, setaccountName] = useState("")
    const [accountType, setaccountType] = useState("")
    //Bank Account info
     const [bankAccountType, setbankAccountType] = useState("")
    const [transitNumber, settransitNumber] = useState("")
    const [financialInstitution, setfinancialInstitution] = useState("")
    const [institutionNumber, setinstitutionNumber] = useState("")
    const [accountNumber, setaccountNumber] = useState("")
    const [balance, setBalance] = useState("")
    const [directDeposit, setdirectDeposit] = useState("")
    //credit card Info
    const[creditCardNumber, setcreditCardNumber] = useState("")
    const [creditCardType, setcreditCardType] = useState ("")
    const [creditLimit, setcreditLimit] = useState ("")
    //UI Functionalities
    const [isHidden,setIsHidden] = useState(true)
    const [formIsHidden, setformIsHidden] = useState(false)
   
//UI Hidden
    const handleClick = () => {
      event.preventDefault();
    setIsHidden(!isHidden)
};

    const handleCancelClick = () => {
      event.preventDefault();
    setformIsHiddenn(!formIsHidden)
};

//function to update accounts
const handleBankDataSubmit = (data) =>{
setAccounts((prevData) => [...prevData, data])
}

const newCredInfo = (event) =>{
  event.preventDefault();
emergedCredit = creditData
setAccounts((prevData) => [...prevData, event,emergedBank])
}


    const accountComponents = [
  {id:"bankAccount", component: <BankForm setIsHidden={setIsHidden} onSubmit={handleBankDataSubmit}/> },
  {id:'creditAccount', component: <CreditForm  setIsHidden={setIsHidden}/>},
    ]

    let chosenForm = accountComponents.filter((targetForm) => targetForm.id === designatedAccount)


return(
<div className="min-h-screen px-8 py-6">
         <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>

  <h1 className="text-3xl font-bold text-gray-900 mb-4">💼 Expense Accounts</h1>
<div className="flex">
  <button
    onClick={handleClick}
    className="bg-blue-400 h-10 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
  >
    ➕ New Account
  </button>

  <div
    className={`transition-all duration-500 ease-in-out ${
      isHidden ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[1000px]'
    }`}
  >
    <form
      id="newAccountForm"
      className="ml-4 bg-white border border-gray-300 rounded-xl shadow-md p-3 w-full flex gap-4"
    >
      <p className="text-lg font-semibold text-gray-700">Select Account Type:</p>

      <button
        type="button"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        onClick={() => setdesignatedAccount("bankAccount")}
      >
        🏦 Bank Account
      </button>

      <button
        type="button"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        onClick={() => setdesignatedAccount("creditAccount")}
      >
        💳 Credit Account
      </button>
          <button
                   onClick={handleClick}
                  className="bg-red-300 hover:bg-red-600 flex text-white items-center justify-center transition rounded"
                >
                  <span className="material-symbols-outlined rounded w-7">close</span>
                </button>
    </form>
  </div>

</div>
<div className={`transition-all duration-500 ease-in-out ${
      isHidden ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[1000px]'
    }`}>
{chosenForm.map(({id, component}) => (<div key={id}>{component}</div>))}
</div>



{/*ACOUNT ARRAY ACCOUNTS ARRAY  ACCOUNTS ARRAY  ACCOUNTS ARRAY  ACCOUNTS ARRAY  ACCOUNTS ARRAY  ACCOUNTS ARRAY  */}

<div className="flex bg-pink-200 w">
  <h1>Accounts </h1>


</div>



</div>
)
} 
export default ExpenseAccount;

