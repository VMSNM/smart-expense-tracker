import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { capitalizeWord, formatDate } from "../utils/formatDate";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transactionMutation";
import toast from "react-hot-toast";
import { GET_AUTH_USER } from "../graphql/queries/userQuery";

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-red-700 to-red-400",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ transaction }) => {
	let { category, amount, location, date, paymentType, description } = transaction;
	const cardClass = categoryColorMap[category];

	const [deleteTransaction, {loading}] = useMutation(DELETE_TRANSACTION, {
		refetchQueries: ["GetTransactions"]
	});

	const { loading: loadingAuthUser, data: authUserData } = useQuery(GET_AUTH_USER);

	const handleDelete = async () => {
		try {
			await deleteTransaction({ variables: { transactionId: transaction._id } });
			toast.success("Transaction deleted successfully");
		} catch (error) {
			console.error("Error deleting transaction:", error);
			toast.error(error.message);
		}
	};

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{capitalizeWord(category)}</h2>
					<div className='flex items-center gap-2'>
						{ !loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} title="Delete transaction" /> }
						{ loading && <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div> }
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} title="Update transaction" />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {capitalizeWord(description)}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {capitalizeWord(paymentType)}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: ${amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location || 'N/A'}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-slate-700 font-bold'>{formatDate(date)}</p>
					<img
						src={authUserData?.authUser.profilePicture}
						title={authUserData?.authUser.username}
						className='h-8 w-8 rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;