/**
 * In the following React template, modify the component so that the counter correctly displays and it increments by one whenever the button is pressed.
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

type MyStateType = {
	count: number;
};

class Counter extends React.Component<any, MyStateType> {
	constructor(props) {
		super(props);
		this.increaseCount = this.increaseCount.bind(this);
	}

	state: MyStateType = {
		count: 0,
	};

	increaseCount() {
		this.setState((prevValue) => ({
			count: prevValue.count + 1,
		}));
	}

	render() {
		return (
			<div id="mainArea">
				<p>
					button count: <span>{this.state.count}</span>
				</p>
				<button id="mainButton" onClick={this.increaseCount}>
					Increase
				</button>
			</div>
		);
	}
}

ReactDOM.render(<Counter />, document.getElementById("test-02"));
