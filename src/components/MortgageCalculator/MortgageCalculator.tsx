import React, {useEffect, useState} from 'react';
import {Forms} from "./Forms.tsx";
import {Table} from "./Table.tsx";
import {DataProps, FormData} from "./DataProps.ts";
import Constants from "./Constants.tsx";
import {getAnnuityPayment, interestNew} from "./startCalculate.ts";

const MortgageCalculator : React.FC = () => {
	const [tableData, setTableData] = useState<DataProps[]>([]);
	const [annuityPayment, setAnnuityPayment] = useState<number>(0);
	const [targetMonth, setTargetMonth] = useState<number>(0)

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
			secondMonths,
			userPayment
		} = props;
		const monthInterestRate = annualInterestRate / 12 / 100;
		const newData: DataProps[] = [];
		let balance = principal;
		let secondBalance = secondPrincipal;
		let totalInterestPaid = 0;
		let isMade = false;

		const monthlyCorrect = secondPrincipal / secondMonths;

		for (let i = 0; i < months; i++) {
			const currentInterestPaid = balance * monthInterestRate;

			balance -= (userPayment - currentInterestPaid);
			if (balance < 0) {break}
			totalInterestPaid += currentInterestPaid;

			secondBalance -= monthlyCorrect;
			const correctTotalInterestPaid = totalInterestPaid - ((secondBalance >= 0) ? monthlyCorrect : 0);
			const secondRemainingBalance = (secondBalance >= 0) ? secondBalance : 0;

			const totalTotalInterestPaid = correctTotalInterestPaid + secondRemainingBalance;

			const newTerm = secondMonths - i - 1;
			let newInterestAmount = 0;
			let newPayment = 0;
			if (newTerm > 0) {
				newInterestAmount = interestNew(balance, monthInterestRate, newTerm );
				newPayment = getAnnuityPayment(balance, annualInterestRate, newTerm);
				if (newInterestAmount - secondRemainingBalance < 0 && !isMade) {
					setTargetMonth(i)
					isMade = true;
				}
			}


			newData.push({
				month: i + 1,
				userPayment: userPayment.toFixed(2),
				remainingBalance: balance.toFixed(2),
				currentInterestPaid: currentInterestPaid.toFixed(2),
				totalInterestPaid: totalInterestPaid.toFixed(2),
				secondRemainingBalance: secondRemainingBalance.toFixed(2),
				monthlyCorrect: (secondBalance >= 0) ? monthlyCorrect.toFixed(2) : '0.00',
				correctTotalInterestPaid: correctTotalInterestPaid.toFixed(2),
				totalTotalInterestPaid: totalTotalInterestPaid.toFixed(2),
				newInterestAmount: (newInterestAmount > 0) ? newInterestAmount.toFixed(2): "0.00",
				differenceInterest: (newInterestAmount > 0) ? (newInterestAmount - secondRemainingBalance).toFixed(2) : "0.00",
				newPayment: newPayment.toFixed(2)
			})
		}



		setTableData(newData);
		setAnnuityPayment(annuityPayment);
	}

	return (
		<div className="container mx-auto">
			<Forms onCalc={calculateData} />
			<Constants annuityPayment={annuityPayment} targetMonth={targetMonth}/>
			<Table tableData={tableData} />
		</div>
	);
};

export default MortgageCalculator;
