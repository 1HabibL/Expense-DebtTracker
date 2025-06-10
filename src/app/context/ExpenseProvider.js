// src/app/context/ExpenseProvider.js

"use client";

import React, { useEffect, useState } from "react";
import { ExpenseContext } from "./ExpenseContext";

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("submittedExpenseData");
    if (savedData && savedData !== "undefined") {
      setExpenses(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("submittedExpenseData", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

