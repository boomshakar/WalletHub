/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

type PhoneBookType = {
	userFirstname: string;
	userLastname: string;
	userPhone: string;
};
const style = {
	table: {
		borderCollapse: "collapse",
	},
	tableCell: {
		border: "1px solid gray",
		margin: 0,
		padding: "5px 10px",
		width: "max-content",
		minWidth: "150px",
	},
	form: {
		container: {
			padding: "20px",
			border: "1px solid #F0F8FF",
			borderRadius: "15px",
			width: "max-content",
			marginBottom: "40px",
		},
		inputs: {
			marginBottom: "5px",
		},
		submitBtn: {
			marginTop: "10px",
			padding: "10px 15px",
			border: "none",
			backgroundColor: "lightseagreen",
			fontSize: "14px",
			borderRadius: "5px",
		},
	},
} as const;

function PhoneBookForm({ addEntryToPhoneBook }) {
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const formElements = Array.from(e.currentTarget);
		const formData = formElements.reduce((acc, el: any) => {
			if (el.name) {
				acc[el.name] = el.value;
			}
			return acc;
		}, {});
		addEntryToPhoneBook((prev: PhoneBookType[]) => [...prev, { ...formData }]);
	};
	return (
		<form onSubmit={(e) => submitForm(e)} style={style.form.container}>
			<label>First name:</label>
			<br />
			<input style={style.form.inputs} className="userFirstname" name="userFirstname" type="text" />
			<br />
			<label>Last name:</label>
			<br />
			<input style={style.form.inputs} className="userLastname" name="userLastname" type="text" />
			<br />
			<label>Phone:</label>
			<br />
			<input style={style.form.inputs} className="userPhone" name="userPhone" type="text" />
			<br />
			<input style={style.form.submitBtn} className="submitButton" type="submit" value="Add User" />
		</form>
	);
}

function InformationTable(props: { phoneBook: PhoneBookType[] }) {
	return (
		<table style={style.table} className="informationTable">
			<thead>
				<tr>
					<th style={style.tableCell}>First name</th>
					<th style={style.tableCell}>Last name</th>
					<th style={style.tableCell}>Phone</th>
				</tr>
			</thead>
			<tbody>
				{props.phoneBook
					.sort((a, b) => a.userLastname.localeCompare(b.userLastname))
					.map((contact, index: React.Key | null | undefined) => (
						<tr key={index}>
							<td style={style.tableCell}>{contact.userFirstname}</td>
							<td style={style.tableCell}>{contact.userLastname}</td>
							<td style={style.tableCell}>{contact.userPhone}</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}

function Application(props) {
	const [phoneBook, setPhoneBook] = useState<PhoneBookType[]>([]);
	return (
		<section>
			<PhoneBookForm addEntryToPhoneBook={setPhoneBook} />
			<InformationTable phoneBook={phoneBook} />
		</section>
	);
}

ReactDOM.render(<Application />, document.getElementById("test-03"));
