"use client"

import React, { useEffect, useState } from "react"

function BankForm({ isHidden, setIsHidden, onSubmit}){
    const [bankData, setbankData] = useState()
    const [accountName, setaccountName] = useState("")
    const [accountType, setaccountType] = useState("")
    //Bank Account info
     const [bankAccountType, setbankAccountType] = useState("")
    const [financialInstitution, setfinancialInstitution] = useState("")
    const [accountNumber, setaccountNumber] = useState("")
    const [balance, setBalance] = useState("")
    const [directDeposit, setdirectDeposit] = useState("")
 
    const handleClick = () => {
    setIsHidden(!isHidden)
};
const handleClickFilter = () => {
    setFilterIsHidden(!filterIsHidden)
}
    const newBankAccount = (event) =>{
        event.preventDefault();

        const passedBankData = {
            accountName: accountName,
            financialInstitution: financialInstitution,
            balance: balance,
        }

        onSubmit(passedBankData);
        setIsHidden(true);
        console.log("accounts Array:", bankData)
    }

   

return(<div>
{/*BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM BANK FORM */}
      <form
  id="expenseDataForm"
  className="bg-white shadow-xl rounded-2xl p-5 w-[1000px]"
  onSubmit={newBankAccount}
>
  <h1>Add New Bank</h1>
  {/* Section 1 */}

    <div className="flex  w-full">
    
    <div className="flex flex-col w-1/2 mr-2">
      {/* SECTION ONE COMPONENT ONE */}
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
        placeholder="e.g. BMO Checking, CIBC Savings..."
      />
    </div>


    <div className="flex flex-col w-1/2 ">
      <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">
        Financial Institution
      </label>
      <select
        value={financialInstitution}
        onChange={(e) => setfinancialInstitution(e.target.value)}
        name="category"
        id="category"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
      <option value="">Select</option>
        <option value="RBC">RBC</option>
        <option value="BMO">BMO</option>
        <option value="TDBank">TD Bank</option>
        <option value="Scotiabank">Scotiabank</option>
        <option value="CIBC">CIBC</option>
        <option value="NationalBankofCanada">National Bank of Canada</option>
        <option value="Tangerine">Tangerine</option>
        <option value="EQBank">EQ Bank</option>
        <option value="HSBC">HSBC</option>
        <option value="LaurentianBank">Laurentian Bank</option>
        <option value="Other">Other</option>
      </select>

    </div>
</div>

{/* Section 2 */}
<div className="flex w-full">
    <div className="flex flex-col w-1/2 mr-2">
      <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2">
        Balance
      </label>
      <input
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        type="number"
        name="balance"
        id="balance"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="e.g. 25.00"
      />
    </div>

    <div className="flex w-1/2 flex-col ">

      <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
    Direct Deposit Amount
    </label>
    <input
      value={directDeposit}
      onChange={(e) => setdirectDeposit(e.target.value)}
      type="number"
      name="directDepositAmount"
      id="directDepositAmount"
      className="w-3/4 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Optional"
    />
    </div>
    </div>

  {/* Section 3 */}
  <div className="mb-4 flex w-full">
    <div className="mr-2">
     <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
      Account Type
    </label>
   <select
        value={accountType}
        onChange={(e) => setaccountType(e.target.value)}
        name="accountType"
        id="accountType"
        className="rounded-lg border border-gray-300 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      ><option value="">Select</option>
        <option value="Checking">Checking</option>
        <option value="Savings">Savings</option>
      </select>
      </div>

          <div className="flex flex-col">
      <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-2 block">
    Debit Last 4 Digits
    </label>
    <input
      value={directDeposit}
      onChange={(e) => setdirectDeposit(e.target.value)}
      type="number"
      name="directDepositAmount"
      id="directDepositAmount"
      className="w-1/2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Optional"
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


{/*CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  CREIDT FORM  */}
    </div>)

} 

export default BankForm;

