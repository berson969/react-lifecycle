import React from 'react';

interface ConstantsProps {
	annuityPayment: number;
	targetMonth: number;
}
const Constants: React.FC<ConstantsProps> = ({ annuityPayment, targetMonth }) => {

	return (
		<div className="m-5">
			<span className="font-rubik justify-center mr-16">
				{`Annuity Payment first loan ${(annuityPayment > 0) ? annuityPayment.toFixed(2) : ""}`}
			</span>
			<span className="font-rubik justify-center">
				{`Number of target month ${targetMonth}`}
			</span>
		</div>
	);
};

export default Constants;
