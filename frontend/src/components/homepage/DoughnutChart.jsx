import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionQuery";
import { calculateTotals } from "./calculateTotals";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

    const {data, loading: loadingChartData} = useQuery(GET_TRANSACTIONS);

    const totalSavings = calculateTotals(data, 'saving');
    const totalExpenses = calculateTotals(data, 'expense');
    const totalInvestments = calculateTotals(data, 'investment');

	const chartData = {
		labels: ["Savings", "Expenses", "Investments"],
		datasets: [
			{
				label: "Total $",
				data: [totalSavings, totalExpenses, totalInvestments],
				backgroundColor: ["rgba(56, 162, 60)", "rgba(185, 28, 21)", "rgba(70, 127, 218)"],
				borderColor: ["rgba(56, 122, 60, 1)", "rgba(145, 28, 21)", "rgba(70, 92, 218)"],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	};

    return (
    <>
        {loadingChartData && <div className='w-12 h-12 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}

        {!loadingChartData && (
            <div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]'>
                <Doughnut data={chartData} />
            </div>
        )}
    </>
  )
}

export default DoughnutChart;