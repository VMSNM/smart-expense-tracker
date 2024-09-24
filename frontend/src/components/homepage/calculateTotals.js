export const calculateTotals = (data, dataType) => {
    if (dataType === 'saving') {
        let totalSavings = data?.transactions.filter(transaction => transaction.category === 'saving').reduce((sum, transaction) => sum + transaction.amount, 0);
        return totalSavings;
    }

    if (dataType === 'expense') {
        let totalSavings = data?.transactions.filter(transaction => transaction.category === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
        return totalSavings;
    }

    if (dataType === 'investment') {
        let totalSavings = data?.transactions.filter(transaction => transaction.category === 'investment').reduce((sum, transaction) => sum + transaction.amount, 0);
        return totalSavings;
    }
}