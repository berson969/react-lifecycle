import React, {useEffect, useState} from 'react';
import {Forms} from "./Forms.tsx";
import {Table} from "./Table.tsx";
import {DataProps, FormData} from "./DataProps.ts";

const MortgageCalculator : React.FC = () => {
	const [tableData, setTableData] = useState<DataProps[]>([]);

	useEffect(() => {
		document.title = "Mortgage Calculator";
	}, []);
	const calculateData = (props: FormData) => {
		const {
			principal,
			annualInterestRate,
			months,
			annuityPayment,
			secondPrincipal,
			secondMonths
		} = props;
		const monthInterestRate = annualInterestRate / 12 / 100;
		const newData: DataProps[] = [];
		let balance = principal;
		let secondBalance = secondPrincipal;
		let totalInterestPaid = 0;

		const monthlyCorrect = secondPrincipal / secondMonths;

		for (let i = 0; i < months; i++) {
			const currentInterestPaid = balance * monthInterestRate;

			balance -= (annuityPayment - currentInterestPaid);
			totalInterestPaid += currentInterestPaid;

			secondBalance -= monthlyCorrect;
			const correctTotalInterestPaid = totalInterestPaid - ((secondBalance >= 0) ? monthlyCorrect : 0);
			const secondRemainingBalance = (secondBalance >= 0) ? secondBalance : 0;
			const totalTotalInterestPaid = correctTotalInterestPaid + secondRemainingBalance;

			newData.push({
				month: i + 1,
				payment: annuityPayment.toFixed(2),
				remainingBalance: balance.toFixed(2),
				currentInterestPaid: currentInterestPaid.toFixed(2),
				totalInterestPaid: totalInterestPaid.toFixed(2),
				secondRemainingBalance: secondRemainingBalance.toFixed(2),
				monthlyCorrect: (secondBalance >= 0) ? monthlyCorrect.toFixed(2) : '0.00',
				correctTotalInterestPaid: correctTotalInterestPaid.toFixed(2),
				totalTotalInterestPaid: totalTotalInterestPaid.toFixed(2)
			})
		}



		setTableData(newData);
	}

	return (
		<div>
			<Forms onCalc={calculateData} />
			<Table tableData={tableData} />
		</div>
	);
};

export default MortgageCalculator;
