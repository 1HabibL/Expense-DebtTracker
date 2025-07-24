'use client';
import { createContext, useContext, useState, useEffect } from "react";

const AccountsContext = createContext();

export function AccountsProvider({ children }) {
    const [accounts, setAccounts] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('submittedAccountData');
        if (savedData) {
            setAccounts(JSON.parse(savedData));
        }
        setHasLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem("submittedAccountData", JSON.stringify(accounts));
        }
    }, [accounts, hasLoaded]);

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts }}>
            {children}
        </AccountsContext.Provider>
    );
}

export function useAccounts() {
    return useContext(AccountsContext);
}
