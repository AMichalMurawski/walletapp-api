const basicCategories = () => {
  return [
    { id: 0, name: 'other expenses', type: ['expense', 'income'] },
    { id: 1, name: 'main expenses', type: ['expense'] },
    { id: 2, name: 'products', type: ['expense'] },
    { id: 3, name: 'car', type: ['expense'] },
    { id: 4, name: 'self care', type: ['expense'] },
    { id: 5, name: 'child care', type: ['expense'] },
    { id: 6, name: 'household products', type: ['expense'] },
    { id: 7, name: 'education', type: ['expense'] },
    { id: 8, name: 'leisure', type: ['expense'] },
    { id: 9, name: 'paycheck', type: ['income'] },
  ];
};

const sumTransactions = (wallet, year, month) => {
  const { transactions, categories } = wallet;

  const categorySummary = categories;
  categorySummary.forEach(category => (category.total = 0));
  const summary = { income: 0, expense: 0 };

  const specificTransactions = transactions.filter(
    trans => trans.Date.getYear() === year && trans.Date.getMonth() === month
  );

  specificTransactions.forEach(trans => {
    const i = categorySummary.findIndex(
      category => category.id === trans.categoryId
    );
    categorySummary[i].total += trans.sum;
    summary[trans.type.toLowerCase()] += trans.sum;
  });

  const periodTotal = summary.income - summary.expense;

  return {
    categorySummary,
    incomeSummary: summary.income,
    expenseSummary: summary.expense,
    periodTotal,
    year,
    month,
  };
};

module.exports = {
  basicCategories,
  sumTransactions,
};
