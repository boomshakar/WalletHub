//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-02.js
 *
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";
import qs from "qs";

https
	.get("https://coderbyte.com/api/challenges/json/rest-get-simple", async (resp) => {
		let data = "";

		// parse json and print "hobbies" property as ITEM1, ITEM2,...
		resp.on("data", (response) => {
			data += response;
		});
		resp.on("end", () => {
			const parseData = JSON.parse(data);
			const convertResponse = parseData?.hobbies.join(", ").toUpperCase();
			console.log(convertResponse);
		});
	})
	.on("error", (e) => {
		console.error(e);
	});
