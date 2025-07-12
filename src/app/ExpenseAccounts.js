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
    const [financialInstitution, setfinancialInstitution] = useState("")
    const [balance, setBalance] = useState("")
    const [directDeposit, setdirectDeposit] = useState("")
    //credit card Info
    const[creditCardNumber, setcreditCardNumber] = useState("")
    const [creditCardType, setcreditCardType] = useState ("")
    const [creditLimit, setcreditLimit] = useState ("")
    //UI Functionalities
    const [isHidden,setIsHidden] = useState(true)
    const [formIsHidden, setformIsHidden] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false);

   
//UI Hidden
    const handleClick = () => {
      event.preventDefault();
    setIsHidden(!isHidden)
};
    const handleCancelClick = () => {
      event.preventDefault();
    setformIsHiddenn(!formIsHidden)
};

//load Data from local Storage

useEffect(() => {
  const savedData = localStorage.getItem('submittedAccountData')
  if (savedData){setAccounts(JSON.parse(savedData))}
  setHasLoaded(true); // tell React we loaded initial data

}, [])


//save Data to local Storage
useEffect(() => {
  if (hasLoaded) {
  localStorage.setItem("submittedAccountData", JSON.stringify(account))
}}, [account, hasLoaded])


//function to update accounts
const handleBankDataSubmit = (data) =>{
setAccounts((prevData) => [...prevData, data])
}

const handleCreditDataSubmit = (data) =>{
setAccounts((prevData) => [...prevData, data])
}

    const accountComponents = [
  {id:"bankAccount", component: <BankForm setIsHidden={setIsHidden} onSubmit={handleBankDataSubmit}/> },
  {id:'creditAccount', component: <CreditForm  setIsHidden={setIsHidden} onSubmit={handleCreditDataSubmit}/>},
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

<div className="flex flex-col bg-pink-200 w">
  <h1>Accounts </h1>
{account.map((acc, index) => (
          <div
            key={index}
            className="w-1/2 h-auto bg-white shadow mb-2 rounded p-4 border border-gray-200"
          >
            <p className="font-bold">{acc.accountName}</p>
            {acc.creditCardType ? (
              <>
                <p>{acc.creditCardType}</p>
                <p>Credit Limit: ${acc.creditLimit}</p>
              </>
            ) : (
              <>
                <p>{acc.financialInstitution}</p>
                <p>Balance: ${acc.balance}</p>
              </>
            )}
             </div>
        ))}

</div>
</div>
)
} 
export default ExpenseAccount;


/*
{
  if (targetForm.id === bankAccount) {
account.map((acc, index) =>(
  <div key={index} className="w-1/2 h-[500px] bg-white shadow mb-2 rounded">
    <p>{acc.accountName}</p>
    <p>Institution: {acc.financialInstitution}</p>
    <p>Balance: ${acc.balance}</p>
    </div>
))
} else {

  account.map((acc, index) =>(
  <div key={index} className="w-1/2 h-[500px] bg-white shadow mb-2 rounded">
    <p>{acc.accountName}</p>
    <p>company: {acc.creditLimit}</p>
    <p>credit limit: ${acc.balance}</p>
    <p>card type: ${acc.creditCardType}</p>
    </div>
))
}
} */
