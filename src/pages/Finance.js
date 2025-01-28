import React from "react";

function Finance() {
  // Sample wallet data
  const walletData = {
    balance: 1250.75,
    recentTransactions: [
      { id: 1, date: "2025-01-20", description: "Sent", amount: -50.25 },
      { id: 2, date: "2025-01-18", description: "Receive", amount: 1500.0 },
      { id: 3, date: "2025-01-15", description: "Sent", amount: -100.0 },
    ],
    spendingCategories: [
      { category: "swap", amount: 200 },
      { category: "send", amount: 150 },
      { category: "Na Na", amount: 100 },
    ],
  };

  const totalSpending = walletData.spendingCategories.reduce(
    (total, category) => total + category.amount,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Wallet Balance */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Wallet Balance</h2>
          <p className="text-3xl font-semibold text-green-500">${walletData.balance.toFixed(2)}</p>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <ul>
            {walletData.recentTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <span>{transaction.date}</span>
                <span>{transaction.description}</span>
                <span
                  className={`${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  } font-medium`}
                >
                  {transaction.amount < 0 ? "-" : "+"}${
                    Math.abs(transaction.amount).toFixed(2)
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spending Categories */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Spending Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {walletData.spendingCategories.map((category) => (
              <div
                key={category.category}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{category.category}</h3>
                <p className="text-gray-600">
                  ${category.amount.toFixed(2)} ({
                    ((category.amount / totalSpending) * 100).toFixed(1)
                  }% of spending)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
