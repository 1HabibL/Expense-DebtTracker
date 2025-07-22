"use client"
import React, { useEffect, useState } from "react"
function CreditForm({ isHidden, setIsHidden, onSubmit }){
    const [creditData, setcreditData] = useState({})
    const [accountName, setaccountName] = useState("")
    //credit card Info
    const[creditType, setcreditType] = useState("")
    const [creditCardType, setcreditCardType] = useState ("")
    const [creditLimit, setcreditLimit] = useState ("")
    const [lastFour, setlastFour] = useState ("")
    const [companyName, setcompanyName] = useState ("")
    //
    const handleClick = () => {
    setIsHidden(!isHidden)
};
const handleClickFilter = () => {
    setFilterIsHidden(!filterIsHidden)

}
    const newCreditAccount = (event) =>{
        event.preventDefault();
        const passedCreditData = {
            accountName: accountName,
            creditType: creditType,
            creditCardType: creditCardType,
            lastFour: lastFour,
            creditLimit: creditLimit,
        }

        onSubmit(passedCreditData)
         setIsHidden(true);
        console.log("accounts Array:", creditData)
    }

return(<div>
{/*CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  */}
<form
  id="expenseDataForm"
  className="bg-white shadow-xl rounded-2xl p-5 w-[1000px]"
  onSubmit={newCreditAccount}
>
  <h1>Add New Credit Account</h1>
  {/* Section 1 */}

    <div className="flex flex-col">
      <label htmlFor="accountName" className="text-sm font-medium text-gray-700 mb-2">
        Account Name
      </label>
      <input
        value={accountName}
        onChange={(e) => setaccountName(e.target.value)}
        type="text"
        name="accountName"
        id="accountName"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. BMO MasterCard, American Express Black, CIBC Line of Credit.."
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="creditLimit" className="text-sm font-medium text-gray-700 mb-2">
        Credit Limit
      </label>
      <input
        value={creditLimit}
        onChange={(e) => setcreditLimit(e.target.value)}
        type="number"
        name="creditLimit"
        id="creditLimit"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. 500.00"
      />
    </div>

  {/* Section 2 */}
  <div className="grid md:grid-cols-2 gap-6 mb-4">
    <div className="flex flex-col">
      <label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">
      Company
      </label>
      
       <input
        value={companyName}
        onChange={(e) => setcompanyName(e.target.value)}
        type="text"
        name="accountName"
        id="accountName"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. BMO, HSBC, Walmart, Uber...."
      />
    
    </div>
  </div>

  {/* Section 3 */}
  <div className="mb-4 flex ">
    <div className="mr-2">
       <label htmlFor="creditType" className="text-sm font-medium text-gray-700 mb-2 block">
      Credit Type
    </label>
   <select
        value={creditType}
        onChange={(e) => setcreditType(e.target.value)}
        name="creditType"
        id="creditType"
        className="rounded-lg border border-gray-300 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      ><option value="">Select</option>
        <option value="CreditCard">Credit Card</option>
        <option value="Line of Credit">Line of Credit</option>
      </select>
      </div>

      <div className="mr-2">

     <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Card Type
    </label>
   <select
        value={creditCardType}
        onChange={(e) => setcreditCardType(e.target.value)}
        name="accountType"
        id="accountType"
        className="rounded-lg border border-gray-300 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      ><option value="Na">Select</option>
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
        <option value="Amex">Amex</option>
      </select>
      </div>
           <div className="w-1/5">
     <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Last 4 Digits
 </label>
       <input
        value={lastFour}
        onChange={(e) => setlastFour(e.target.value)}
        type="text"
        name="lastFour"
        id="lastFour"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="1234"
      />

   
      </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4">
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={handleClick}
    >
      Add Account
    </button>
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Cancel
    </button>
  </div>
</form>
    
    </div>)
} 

export default CreditForm;

