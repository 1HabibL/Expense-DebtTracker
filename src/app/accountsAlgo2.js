export function accountBalance(expenseArray, accountArray) {
  for (let k = 0; k < accountArray.length; k++) {
    const account = accountArray[k];

    if (account.accountType === "credit") {
      // Credit: add up all expenses tied to this credit account
      let creditTotal = 0;

      for (let i = 0; i < expenseArray.length; i++) {
        if (expenseArray[i].account === account.accountName) {
          creditTotal += parseInt(expenseArray[i].amount || 0);
        }
      }

      account.balance = creditTotal;

    } else if (account.accountType === "bank") {
      // Bank: start with initial balance and subtract matching expenses
      let bankBalance = parseInt(account.initialbalance || 0);

      for (let i = 0; i < expenseArray.length; i++) {
        if (expenseArray[i].account === account.accountName) {
          bankBalance -= parseInt(expenseArray[i].amount || 0);
        }
      }

      account.balance = bankBalance;
    }
  }

  return accountArray;
}
