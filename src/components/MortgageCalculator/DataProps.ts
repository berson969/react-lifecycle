export interface DataProps {
	month: number;
	payment: string;
	remainingBalance: string;
	currentInterestPaid: string;
	totalInterestPaid: string;
	secondRemainingBalance: string;
	monthlyCorrect: string;
	correctTotalInterestPaid: string;
	totalTotalInterestPaid: string;
}

export interface FormData {
	principal: number;
	annualInterestRate: number;
	months: number;
	annuityPayment: number;
	secondPrincipal: number;
	secondMonths: number;
}

export interface FormsProps {
	onCalc: (formData: FormData) => void;
}
