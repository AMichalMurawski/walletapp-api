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

  let categorySummary = wallet.categories;
  categorySummary.forEach(category => (category.total = 0));
  const summary = { income: 0, expense: 0 };

  const specificTransactions = transactions.filter(
    trans => getYear(trans.Date) === year && getMonth(trans.Date) === month
  );

  specificTransactions.forEach(trans => {
    const i = categorySummary.findIndex(
      category => category.id === trans.categoryId
    );
    categorySummary[i].total += trans.sum;
    summary[lowerCase(trans.type)] += trans.sum;
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

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  categoryId: { type: String, required: true },
  comment: { type: String },
  sum: { type: Number, required: true },
});

module.exports = {
  basicCategories,
  sumTransactions,
};
