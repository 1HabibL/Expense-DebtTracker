{(Array.isArray(expenses)
    ? filteredExpenses.length > 0
      ? filteredExpenses
      : expenses
    : []
  ).map((expense, index) => (
    <li
      key={index}
      className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-wrap items-center gap-4"
    >
      {/* Category */}
      {(
        <div className="flex-1 min-w-[120px] text-yellow-800">
          {expense.category}
        </div>
      )}
  
      {/* Buttons */}
      <div className="flex gap-2">
        {(
          <>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-300 hover:bg-red-600 text-white p-2 rounded-xl transition"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
         
          </>
        )}
      </div>
    </li>
  ))
  
  }