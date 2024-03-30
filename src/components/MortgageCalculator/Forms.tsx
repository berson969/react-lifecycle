import React, {useEffect, useState} from 'react';
import {getAnnuityPayment} from "./startCalculate.ts";
import {FormsProps} from "./DataProps.ts";
import {getFormData, saveFormData} from "./LocalStorage.ts";



export const Forms: React.FC<FormsProps> = ({ onCalc }) => {
	const [principal, setPrincipal] = useState<number>(0);
	const [annualInterestRate, setAnnualInterestRate] = useState<number>(0);
	const [months, setMonths] = useState<number>(0);
	const [secondPrincipal, setSecondPrincipal] = useState<number>(0);
	const [secondMonths, setSecondMonths] = useState<number>(120);
	const [userPayment, setUserPayment] = useState<number>(0);

	useEffect(() => {
		const {
			principal,
			annualInterestRate,
			months,
			secondPrincipal,
			secondMonths,
			userPayment} = getFormData();
		setPrincipal(principal);
		setAnnualInterestRate(annualInterestRate);
		setMonths(months);
		setSecondPrincipal(secondPrincipal);
		setSecondMonths(secondMonths);
		setUserPayment(userPayment);

	}, []);


	const handleCalculate = () => {
		const annuityPayment = getAnnuityPayment(principal, annualInterestRate, months)
		onCalc({principal, annualInterestRate, months, annuityPayment, secondPrincipal, secondMonths, userPayment})
		saveFormData({
			principal,
			annualInterestRate,
			months,
			annuityPayment,
			secondPrincipal,
			secondMonths,
			userPayment,
		})
	}

	return (
		<div className="flex flex-col justify-center m-12">
			<div className="md:columns-1 lg:columns-2 mx-auto">
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="loan-amount" className="font-rubik  mr-5 whitespace-nowrap text-xl">Loan Amount</label>
					<input
						id="loan-amount"
						type="number"
						placeholder="Loan Amount"
						value={principal === 0 ? '' : principal}
						onChange={(e) => setPrincipal(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="interest-rate" className="font-rubik mr-5 whitespace-nowrap text-xl">Interest Rate</label>
					<input
						id="interest-rate"
						type="number"
						placeholder="Interest Rate"
						value={annualInterestRate === 0 ? '' : annualInterestRate}
						onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="months-left" className="font-rubik mr-5 whitespace-nowrap text-xl">Term in months</label>
					<input
						id="months-left"
						type="number"
						placeholder="Months left"
						value={months === 0 ? '' : months}
						onChange={(e) => setMonths(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="user-payment" className="font-rubik mr-5 whitespace-nowrap text-xl">Payment</label>
					<input
						id="user-payment"
						type="number"
						placeholder="User payment"
						value={userPayment === 0 ? '' : userPayment}
						onChange={(e) => setUserPayment(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="second-loan" className="font-rubik mr-5 whitespace-nowrap text-xl">DPAL</label>
					<input
						id="second-loan"
						type="number"
						placeholder="Second Loan Amount"
						value={secondPrincipal === 0 ? '' : secondPrincipal}
						onChange={(e) => setSecondPrincipal(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
				<div className="flex m-2 w-96 justify-end">
					<label htmlFor="second-months-left" className="font-rubik mr-5 whitespace-nowrap text-xl">DPAL in months</label>
					<input
						id="second-months-left"
						type="number"
						placeholder="Second Months left"
						value={secondMonths === 0 ? '' : secondMonths}
						onChange={(e) => setSecondMonths(parseFloat(e.target.value))}
						className="text-right border-2 border-sky-500 w-96 h-8 custom-placeholder lowercase"
						required
					/>
				</div>
</div>
			<button
				onClick={handleCalculate}
				className="bg-blue-600 w-full my-3 mx-auto p-1 text-center text-white rounded-md min-h-6">Calculate
			</button>
		</div>
	);
};

