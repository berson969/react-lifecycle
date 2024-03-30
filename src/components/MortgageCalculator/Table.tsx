import React from 'react';
import {DataProps} from "./DataProps.ts";

export const Table: React.FC<{ tableData: DataProps[] }>  = ({ tableData }) => {

	return (
		<table className="w-full border-collapse border border-gray-300">
			<thead>
			<tr>
				<th  className="border border-gray-300 px-4 py-2">Month</th>
				<th  className="border border-gray-300 px-4 py-2">Payment</th>
				<th  className="border border-gray-300 px-4 py-2">Remaining Balance</th>
				<th  className="border border-gray-300 px-4 py-2">Interest Paid</th>
				<th  className="border border-gray-300 px-4 py-2">Total Interest Paid</th>
				<th  className="border border-gray-300 px-4 py-2">Monthly Correct</th>
				<th  className="border border-gray-300 px-4 py-2">Second Loan remaining</th>
				<th  className="border border-gray-300 px-4 py-2">Correct Total Interest</th>
				<th  className="border border-gray-300 px-4 py-2">Full Total Interest</th>
				<th  className="border border-gray-300 px-4 py-2">New Interest Amount</th>
				<th  className="border border-gray-300 px-4 py-2">Difference Amount</th>
			</tr>
			</thead>
			<tbody>
			{tableData.map((data) => (
				<tr key={data.month}>
					<td  className="border border-gray-300 px-4 py-2 text-center">{data.month}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.userPayment}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.remainingBalance}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.currentInterestPaid}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.totalInterestPaid}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.monthlyCorrect}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.secondRemainingBalance}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.correctTotalInterestPaid}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.totalTotalInterestPaid}</td>
					<td  className="border border-gray-300 px-4 py-2 text-end">{data.newInterestAmount}</td>
					<td
						className={`border border-gray-300 px-4 py-2 text-end ${parseFloat(data.differenceInterest) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
						{data.differenceInterest}
					</td>
				</tr>
			))}
			</tbody>
		</table>
	);
};
