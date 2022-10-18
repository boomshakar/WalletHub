/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title]
 *  property of component [ng-app]
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "textfield",
	template: '<input type="text" value="" "/>',
})
export class TextField {
	field = "";

	onInputChange(e: any) {
		this.field = e.target.value;
		console.log(this.field);
	}
}

@Component({
	selector: "child-component",
	template: `<h2>
		Title:
		<h2><br /><textfield></textfield></h2>
	</h2>`,
})
export class ChildComponent {}

@Component({
	selector: "ng-app",
	template: `<div>
		<child-component></child-component> <br />
		Title is {{ title }}
	</div>`,
})
export class Test02Component {
	title: string = "";
	getTextFeild = new TextField();

	ngAfterViewInit() {
		this.title = this.getTextFeild.field;
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: "",
				component: Test02Component,
			},
		]),
	],
	declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
