{Array.isArray(expenses) && filteredExpenses.length === 0 ? (
    <p className="text-gray-500 px-4">No results found</p>
  ) : (
    (filteredExpenses.length > 0 ? filteredExpenses : expenses).map((expense, index) => (
      <li
        key={index}
        className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-wrap items-center gap-4"
      >
        {/* Name */}
        {editIndex === index ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex-1 min-w-[120px] font-medium text-blue-800">
            {expense.expenseName}
          </div>
        )}
  
        {/* Amount */}
        {editIndex === index ? (
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex-1 min-w-[100px] text-purple-700 font-semibold">
            ${expense.amount}
          </div>
        )}
  
        {/* Category */}
        {editIndex === index ? (
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-lg"
          >
            <option value="">No Category</option>
            {[
              "Food",
              "Transportation",
              "Entertainment",
              "Utilities",
              "Health",
              "Insurance",
              "Education",
              "Rent",
              "Miscellaneous",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex-1 min-w-[120px] text-yellow-800">
            {expense.category}
          </div>
        )}
  
        {/* Date */}
        {editIndex === index ? (
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            className="flex-1 min-w-[130px] p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex-1 min-w-[130px] text-gray-500">
            {expense.date}
          </div>
        )}
  
        {/* Buttons */}
        <div className="flex gap-2">
          {editIndex === index && isEditing ? (
            <>
              <button
                onClick={() => cancelEdit(index)}
                className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit(index)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-300 hover:bg-red-600 text-white p-2 rounded-xl transition"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
              <button
                onClick={() => handleEditButtonClick(index)}
                className="bg-blue-300 hover:bg-blue-600 text-white p-2 rounded-xl transition"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </>
          )}
        </div>
      </li>
    ))
  )}
  