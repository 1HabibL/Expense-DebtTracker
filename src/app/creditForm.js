"use client"
import React, { useEffect, useState } from "react"
function CreditForm({ isHidden, setIsHidden }){
    const [creditData, setcreditData] = useState({})
    const [accountName, setaccountName] = useState("")
    //credit card Info
    const[creditCardNumber, setcreditCardNumber] = useState("")
    const [creditCardType, setcreditCardType] = useState ("")
    const [creditLimit, setcreditLimit] = useState ("")

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
            creditCardNumber: creditCardNumber,
            creditCardType: creditCardType,
            creditLimit: creditLimit,
        }
        setAccounts((prevData) => [...prevData, passedCreditData])
        console.log("accounts Array:", creditData)
    }

return(<div>
{/*CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  */}
<form
  id="expenseDataForm"
  className="bg-white shadow-xl rounded-2xl p-5 w-[1500px]"
  onSubmit={newCreditAccount}
>
  <h1>Add New Credit Account</h1>
  {/* Section 1 */}

    <div className="flex flex-col">
      <label htmlFor="expenseName" className="text-sm font-medium text-gray-700 mb-2">
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
      <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2">
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
      <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">
      Company
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
  </div>

  {/* Section 3 */}
  <div className="mb-4">

     <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Card Type
    </label>
   <select
        value={creditCardType}
        onChange={(e) => setcreditCardType(e.target.value)}
        name="accountType"
        id="accountType"
        className="rounded-lg border border-gray-300 p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      ><option value="">Select</option>
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
        <option value="Amex">Amex</option>
      </select>
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

