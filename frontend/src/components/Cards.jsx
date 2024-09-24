import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transactionQuery";

const Cards = () => {
	const {data, loading, error} = useQuery(GET_TRANSACTIONS);

	let sortedData = data?.transactions.slice(0).sort((a,b) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10 text-slate-700'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>

				{ error && <p className="text-2xl font-bold text-center w-full">Error: {error.message}</p> }
				{ loading && <p className="text-2xl font-bold text-center w-full">Loading...</p> }

				{ !loading && sortedData.length === 0 && (
					<p className="font-bold text-slate-800 text-center w-full">No transactions found</p>
				)}
				{ !loading && sortedData.map(transaction => (
					<Card key={transaction._id} transaction={transaction} />
				))}

			</div>
		</div>
	);
};
export default Cards;