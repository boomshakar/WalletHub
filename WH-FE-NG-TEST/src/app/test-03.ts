/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
	selector: "ng-app",
	template: `<form (submit)="onFormSubmit($event)">
		<h2>Login</h2>
		<br />
		<input type="email" value="" name="email" (input)="onEmailChange($event)" />
		<div *ngIf="errorMsg.email">Must contain a valid email address</div>
		<br />
		<input type="password" value="" name="password" (input)="onPasswordChange($event)" />
		<button type="submit">Submit</button>
		<div *ngIf="errorMsg.password">Must containa minimum of 6 characters between (a-z,A-Z,0-9,!@#$%^&*)</div>
		<br /><br />
		<div *ngIf="logged_in">Logged In!</div>
	</form>`,
})
export class Test03Component {
	email: string = "";
	password: string = "";

	errorMsg = {
		email: false,
		password: false,
	};
	logged_in = false;

	onEmailChange(e: any) {
		this.email = e.target.value;
		const emailTest = /^([a-zA-Z0-9-_.]+)@([a-zA-Z-_.]+).([a-zA-Z]{1,5})/;
		this.inputValidator(emailTest, this.email, "email");
	}
	onPasswordChange(e: any) {
		this.password = e.target.value;
		const passwordTest = /A(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/i;
		this.inputValidator(passwordTest, this.password, "password");
	}
	inputValidator(test: any, value: string, validate: "email" | "password") {
		if (!test.test(value)) {
			if (validate === "email") {
				this.errorMsg.email = true;
			} else {
				this.errorMsg.password = true;
			}
		} else {
			if (validate === "email") {
				this.errorMsg.email = false;
			} else {
				this.errorMsg.password = false;
			}
		}
		this.logged_in = false;
	}
	onFormSubmit(e: any) {
		e.preventDefault();
		if (this.email !== "" && this.password !== "" && !this.errorMsg.email && !this.errorMsg.password) {
			this.logged_in = true;
		}
	}
}

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: Test03Component,
			},
		]),
	],
	declarations: [Test03Component],
})
export class Test03Module {}
