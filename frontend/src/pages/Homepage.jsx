import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/userMutation";
import DoughnutChart from "../components/homepage/DoughnutChart";

const HomePage = ({data}) => {

	const [logout, {loading, client}] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthUser"]
	});

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Successfully logged out')
			client.resetStore(); // force apollo to reset cache
		} catch (error) {
			console.log("Error logging out:", error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center mb-2'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-0 mr-4 bg-gradient-to-r from-slate-700 via-blue-500 to-slate-500 inline-block text-transparent bg-clip-text'>
						Track everything, control your finances
					</p>
					{!data && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
					<img
						src={data?.authUser.profilePicture}
						title={data?.authUser.username}
						className='w-11 h-11 rounded-full'
						alt='Avatar'
					/>
					{!loading && <MdLogout title="Logout" className='mx-2 w-7 h-7 cursor-pointer text-slate-700' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<DoughnutChart />		
					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;