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
//Editing Functionalities
    const [isEditing, setIsEditing] = useState (false)  
   
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

//delete function
const deleteAccount = (index) =>{
  const newAccounts = account.filter((_,i) => i !== index);
  setAccounts(newAccounts)
}


    const accountComponents = [
  {id:"bankAccount", component: <BankForm setIsHidden={setIsHidden} onSubmit={handleBankDataSubmit}/> },
  {id:'creditAccount', component: <CreditForm  setIsHidden={setIsHidden} onSubmit={handleCreditDataSubmit}/>},
    ]

    let chosenForm = accountComponents.filter((targetForm) => targetForm.id === designatedAccount)

const logoMap = [{company:"RBC", logo:'/images/RBCLogo.png'}, {company:"BMO", logo:'/images/bmoLogo.png'}, {company:"CIBC", logo:'/images/cibcLogo.png'}, 
 {company:"EQBank", logo:'/images/eqLogo.png'}, {company:"TDBank", logo:'/images/TDBankLogo.png'}, {company:"Scotiabank", logo:'/images/scotiaLogo.png'},
 {company:"NationalBankofCanada", logo:'/images/nationalLogo.png'}, {company:"Tangerine", logo:'/images/TangLogo.svg'}, 
 {company:"HSBC", logo:'/images/hsbcLogo.png'}, {company:'LaurentianBank' , logo:'/images/laurentianLogo.webp'}, {company:"Other",logo:'/images/defaultLogo.png'},
 //CREDIT CARD LOGOS
 {company:"Visa", logo:'/images/visaLogo.png'},{company:"MasterCard", logo:'/images/mcLogo.png'},
 {company:"Amex", logo:'/images/aeLogo.png'},  
]
//const logoSrc = logoMap[account.financialInstitution] || '/images/defaultLogo.png'; 

//Logo Generating Function
function returnLogo(object){
  let companyLogo = logoMap.filter((logoInfo) => logoInfo.company === object)
  return companyLogo
}

//ACCOUNTS EDIT PROGRAM


return(
<div className="px-8 py-6 overflow-hidden max-h-[1070px]">
         <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"></link>

  <h1 className="text-3xl font-bold text-gray-900 mb-4">💼 Expense Accounts</h1>
<div className="flex ">
  <button
    onClick={handleClick}
    className="bg-blue-400 h-10 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
  >
    ➕ New Account
  </button>

  <div
    className={`transition-all duration-500 ease-in-out ${
      isHidden ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[1000px] '
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

<div className="flex flex-col bg-pink-200 overflow-y-auto max-h-[1070px] space-y-4 w-3/5">
{account.map((acc, index) => (
          <div
            key={index}
            className="w-full bg-white shadow mb-2 rounded p-4 border border-gray-200"
          >
            {acc.creditType ? (
                  acc.creditType === "CreditCard" ? (
                //Credit card UI
                <div id="creditContainer" className="flex justify-between 0">
                 <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white rounded-2xl shadow-xl p-6 w-full max-w-md h-56 relative overflow-hidden">

    {/* Top Row: Bank or Card Name */}
    <div className="flex justify-between items-center mb-4 ">
      <h2 className="text-lg font-semibold">{acc.accountName}</h2>
      <span className="text-sm italic opacity-80">{acc.creditCardType}</span>
    </div>

    {/* Chip Icon & Card Number */}
    <div className="mb-4">
      <div className="w-10 h-7 bg-yellow-400 rounded-sm mb-2"></div>
      <p className="tracking-widest text-xl font-mono">
        •••• •••• •••• {acc.lastFour}
      </p>
    </div>

    {/* Bottom Info Row */}
    <div className="flex justify-between text-2xl mt-auto">
      <div>
        <p className="uppercase opacity-80">Limit</p>
        <p className="">${acc.creditLimit}</p>
      </div>
      <div>
     {<img className="h-[70]" src={returnLogo(acc.creditCardType)[0].logo} /> }
      </div>
    </div>


       </div>
       {/* INFO SHEET*/}
      <div
  id="infoSheet"
  className="bg-white flex justify-between items-center border border-gray-300 rounded-2xl shadow-md p-6 space-x-4"
>
  {/* Left Section */}
  <div className="flex flex-col justify-center">
    <h2 className="text-sm text-gray-500">Balance</h2>
    <p className="text-2xl font-bold text-gray-800">${acc.balance ?? "9999"}</p>

    <h2 className="text-sm mt-4 text-gray-500">Credit Limit</h2>
    <p className="text-2xl font-bold text-gray-800">${acc.creditLimit ?? "9999"}</p>
  </div>

  {/* Vertical Divider */}
  <div className="w-px bg-gray-300 h-16 mx-2" />

  {/* Right Section */}
  <div className="flex flex-col justify-center items-center">
    <p className="text-3xl font-extrabold text-purple-600">
      {acc.utilization ?? "45%"}
    </p>
    <p className="text-sm text-gray-600">Utilization</p>
  </div>
 
</div>

<div>
 <div className="flex justify-end">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Delete
    </button>
  </div>

    <div className="flex justify-end ">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Edit
    </button>
  </div>
    </div>

  <div className="min-w-[450px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-4">
  <form className="gap-4 items-center">
    <div className="flex justify-between">
    <h2 className="col-span-2 text-xl font-semibold text-gray-700">Edit Account</h2>
    <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Save
      </button>
      </div>
<div className="flex justify-between">
<div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600">Account Name</label>
    <input
      type="text"
      placeholder="Account Name"
      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label className="text-sm font-medium text-gray-600">Card Type</label>
    <select
      value={creditCardType}
      onChange={(e) => setcreditCardType(e.target.value)}
      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      <option value="Visa">Visa</option>
      <option value="MasterCard">MasterCard</option>
      <option value="Amex">Amex</option>
    </select>
</div>
<div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600">Last 4 Digits</label>
    <input
      type="text"
      maxLength={4}
      placeholder="1234"
      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label className="text-sm font-medium text-gray-600">Credit Limit</label>
    <input
      type="number"
      placeholder="$5000"
      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
    </div>

    <div className="col-span-2 flex justify-end">
      
    </div>
  </form>
</div>
 </div>
    ) : (
    //LINE OF CREDIT UI
    <div className="flex max-w-3xl justify-between ">
        <div className="bg-gradient-to-br from-gray-100 to-white border border-gray-300 rounded-2xl shadow-md p-6 w-full max-w-2xl">
  {/* Header: Account Name & Credit Type */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">{acc.accountName}</h2>
    <span className="text-sm text-gray-600 italic">{acc.creditType}</span>
  </div>

  {/* Main Info Row */}
  <div className="grid grid-cols-3 gap-6 text-center">
    
    <div>
      <p className="text-2xl font-mono text-gray-800">${acc.balance ?? "9999"}</p>
      <hr className="border-t border-gray-400 my-2 w-3/4 mx-auto" />
      <p className="text-sm text-gray-600">Balance</p>
    </div>

    <div>
      <p className="text-2xl font-mono text-gray-800">{acc.utilization ?? "45%"}%</p>
      <hr className="border-t border-gray-400 my-2 w-3/4 mx-auto" />
      <p className="text-sm text-gray-600">Utilization</p>
    </div>

    <div>
      <p className="text-2xl font-mono text-gray-800">${acc.creditLimit}</p>
      <hr className="border-t border-gray-400 my-2 w-3/4 mx-auto" />
      <p className="text-sm text-gray-600">Credit Limit</p>
    </div>
  </div>

  {/* Footer: Delete Button */}
  <div className="flex justify-end mt-6">
  
  </div>
 
</div>

<div>
<div className="flex justify-end ">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Delete
    </button>
  </div>

    <div className="flex justify-end ">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Edit
    </button>
    </div>
  </div>
     <div>
      <form className="bg-amber-400">
        <label>Account Name</label>
        <input></input>
         <label>creditCardType</label>
        <input></input>
         <label>credit limit</label>
        <input></input>
      </form>
    </div>
</div>
        )
            ) : (
              <>
              <div className="flex max-w-3xl justify-between bg-amber-300">
  
           <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 h-full w-full 
             max-w-2xl">
  {/* Header */}
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-xl font-semibold text-gray-800">{acc.accountName}</h2>
    <span className="text-sm text-gray-500">{acc.financialInstitution}</span>
  </div>

  {/* Divider Line */}
  <div className="border-t border-dashed border-gray-300 mb-4"></div>

  {/* Balance Section */}
  <div className="flex justify-between items-center mb-3">
    <p className="text-sm text-gray-600">Balance</p>
    <p className="text-lg font-bold text-green-600">${acc.balance}</p>
  </div>

  {/* Account Numbers (optional for realism) */}

   {/* acc.financialInstitution === "BMO" ? (<img className="h-[100]" src={`/images/bmoLogo.png`} alt="Bmo" />):
(<img className="h-[100]" src={`/images/RBCLogo.png`} alt="bmo" />) */}
  
{
<img className="h-[100]" src={returnLogo(acc.financialInstitution)[0].logo} />
}

  {/* Delete Button */}
</div>
<div>
<div className="flex justify-end">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Delete
    </button>
  </div>

    <div className="flex justify-end ">
    <button
      onClick={() => deleteAccount(index)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Edit
    </button>
    </div>
  </div>
</div>
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
