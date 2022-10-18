/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "ng-app",
	template: `<div>
		<h2>Loan Details</h2>
		<b>Monthly Payment:</b> {{ !loan_amount ? "N/A" : calcMonthlyPayment() }} <br />
		<b>Late Payment Fee : {{ !loan_amount ? "N/A" : calcLatePayment() }}</b> <br />
	</div>`,
})
export class Test01Component {
	loan_amount: number = 1000;
	monthly_payment: number = 200;
	late_payment = 10;

	commaSeparatedValue(value: number) {
		const valueString = value.toString();
		const amount = parseFloat(valueString).toFixed(2);
		const formattedString = "$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return formattedString;
	}

	calcMonthlyPayment() {
		this.monthly_payment = 0.02 * this.loan_amount;
		return this.commaSeparatedValue(this.monthly_payment);
	}
	calcLatePayment() {
		this.late_payment = 0.05 * this.monthly_payment;
		return this.commaSeparatedValue(this.late_payment);
	}
}

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: Test01Component,
			},
		]),
	],
	declarations: [Test01Component],
})
export class Test01Module {}
