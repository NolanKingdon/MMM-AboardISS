/* Magic Mirror
 * Node Helper: MMM-AboardISS
 *
 * By Nolan Kingdon
 * MIT Licensed.
 */

 // Module Requires
const https = require("https");
const moment = require("moment");
const today = new Date().toISOString().split("T")[0];
let splitToday = today.split("-");
let todayMoment = moment([splitToday[0], splitToday[1], splitToday[2]]);
// MagicMirror Requires
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload = {}) {
		if (notification === "ISS-DATA_REQUEST") {
			let response = [];
			https.get("https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json", (resp) => {
				let data = "";
				resp.on("data", (chunk) => {
					data += chunk;
				});
				// The whole response has been received. Print out the result.
				resp.on("end", () => {
					let json = JSON.parse(data);
					// console.log("People on board the ISS: ", json.number);	
					json.people.forEach( person => {
						//console.log(`${person.title} ${person.name}: ${person.country} - ${person.countryflag} - ${person.launchdate} - ${person.careerdays}`);
						//console.log(`${person.location}, ${person.bio}`);
						// Getting Moment Information
						let launchDate = person.launchdate.split("-");
						let launchMoment = moment([launchDate[0], launchDate[1], launchDate[2]]);
						let spaceDays = todayMoment.diff(launchMoment, "days");
						// console.log(`${person.title}, ${person.name} - ${person.country}`);
						// console.log(`${spaceDays} Days in space (${person.launchdate} to ${today})`);
						// Getting Twitter information
						let twitter = person.twitter.split("/")[3];
						let handle = (twitter === undefined ? "No Twitter Account" : `@${twitter}`);
						response.push({
							person,
							spaceDays,
							handle
						});
					});
					console.log("Response Scoped: ", typeof(response));
					// Sending successful response notification
					this.sendData(response);
				});

			}).on("error", err => {
				console.log(err.message);
			});
		}
	},

	// Example function send notification test
	sendData: function(payload) {
		this.sendSocketNotification("ISS-DATA_RESPONSE", payload);
	}
});
