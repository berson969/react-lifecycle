import React, {useState} from 'react';
import {startCalculate} from "./startCalculate.ts";
import {FormsProps} from "./DataProps.ts";



export const Forms: React.FC<FormsProps> = ({ onCalc }) => {
	const [principal, setPrincipal] = useState<number>(0);
	const [annualInterestRate, setAnnualInterestRate] = useState<number>(0);
	const [months, setMonths] = useState<number>(0);
	const [secondPrincipal, setSecondPrincipal] = useState<number>(0);
	const [secondMonths, setSecondMonths] = useState<number>(0);

	const handleCalculate = () => {
		const annuityPayment = startCalculate(principal, annualInterestRate, months)
		onCalc({principal, annualInterestRate, months, annuityPayment, secondPrincipal, secondMonths})
	}

	return (
		<div className="flex gap-6 m-12 justify-center">
			<div className="w-96 flex flex-col gap-6 items-end ">
				<div className="flex gap-5">
					<label htmlFor="loan-amount" className="font-rubik text-xl">Loan Amount</label>
					<input
						id="loan-amount"
						type="number"
						placeholder="Loan Amount"
						value={principal}
						onChange={(e) => setPrincipal(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500"
						required
					/>
				</div>
				<div className="flex gap-5">
					<label htmlFor="interest-rate" className="font-rubik text-xl">Interest Rate</label>
					<input
						id="interest-rate"
						type="number"
						placeholder="Interest Rate"
						value={annualInterestRate}
						onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500"
						required
					/>
				</div>
				<div className="flex gap-5">
					<label htmlFor="months-left" className="font-rubik text-xl">Months left</label>
					<input
						id="months-left"
						type="number"
						placeholder="Months left"
						value={months}
						onChange={(e) => setMonths(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500"
						required
					/>
				</div>
				<button
					onClick={handleCalculate}
					className="bg-blue-600 w-full p-1 text-center text-white rounded-md min-h-6">Calculate
				</button>
			</div>
			<div className="w-96 flex flex-col gap-6 items-end ">
				<div className="flex gap-5">
					<label htmlFor="second-loan" className="font-rubik text-xl">Second Loan</label>
					<input
						id="second-loan"
						type="number"
						placeholder="Second Loan Amount"
						value={secondPrincipal}
						onChange={(e) => setSecondPrincipal(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500"
						required
					/>
				</div>
				<div className="flex gap-5">
					<label htmlFor="second-months-left" className="font-rubik text-xl">Second Months left</label>
					<input
						id="second-months-left"
						type="number"
						placeholder="Second Months left"
						value={secondMonths}
						onChange={(e) => setSecondMonths(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500"
						required
					/>
				</div>

			</div>
		</div>
	);
};

