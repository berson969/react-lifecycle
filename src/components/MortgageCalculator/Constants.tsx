import React from 'react';

interface ConstantsProps {
	annuityPayment: number;
}
const Constants: React.FC<ConstantsProps> = ({ annuityPayment }) => {

	return (
		<div className="m-5">
			<span className="font-rubik justify-center">
				{`Annuity Payment first loan ${(annuityPayment > 0) ? annuityPayment.toFixed(2) : ""}`}
			</span>
		</div>
	);
};

export default Constants;
