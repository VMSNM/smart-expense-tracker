import Transaction from '../models/transactionModel.js';

const transactionResolver = {
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                });

                await newTransaction.save();
                console.log(newTransaction);
                return newTransaction;
            } catch (error) {
                console.log("Error in createTransaction: " + error);
                throw new Error(error.message || "Error creating transaction");
            }
        },
        updateTransaction: async (_, {input}) => {
            try {
                const updatedTransaction = Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
                return updatedTransaction;
            } catch (error) {
                console.log("Error in updateTransaction: " + error);
                throw new Error(error.message || "Error update transaction");
            }
        },
        deleteTransaction: async (_, {transactionId}) => {
            try {
                const deletedTransaction = Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (error) {
                console.log("Error in deleteTransaction: " + error);
                throw new Error(error.message || "Error delete transaction");
            }
        }
    },
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error('Unauthorized');
                const userId = await context.getUser()._id;

                const transactions = Transaction.find({ userId }).sort({date: -1});
                return transactions;
            } catch (error) {
                console.log("Error in transactionsQuery: " + error);
                throw new Error(error.message || "Error getting transactions");
            }
        },

        transaction: async (_, {transactionId}, context) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.log("Error in transactionQuery: " + error);
                throw new Error(error.message || "Error getting transaction");
            }
        },
    },
    // TODO: Create Transaction/User RELATION
}

export default transactionResolver;