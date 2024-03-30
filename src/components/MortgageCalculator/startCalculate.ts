export const startCalculate = (principal: number, annualInterestRate: number, months: number) => {
	const monthlyInterestRate = annualInterestRate / 12 / 100;
	const annuityRate = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), months) / (Math.pow((1 + monthlyInterestRate), months) - 1);
	return principal * annuityRate;
}
