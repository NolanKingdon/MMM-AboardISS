/* global Module */

/* Magic Mirror
 * Module: MMM-AboardISS
 *
 * By Nolan Kingdon
 * MIT Licensed.
 */

Module.register("MMM-AboardISS", {
	defaults: {
		updateInterval: 86400000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	/**
	 * Start function - fires off when module first loads
	 */
	start: function() {
		// Scoping this
		var self = this;
		// Adding placeholders for data to display in the future
		this.listItems = null;
		this.sendSocketNotification("ISS-DATA_REQUEST");
		// Schedule update timer.
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	buildTemplate: function(args = {}){

	},
	// TODO - Refactor this to include anonymous functions and better conventions

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.dataRequest = this.sendSocketNotification("ISS-DATA_REQUEST");
		}, nextLoad);
	},

	getDom: function() {
		var self = this;
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		// If we have a successful data load from the helper:
		if(this.listItems !== null){
			let content = "<div class='ISS-List'>";
			this.listItems.forEach( item => {
				let title = `<p>${item.person.title}, ${item.person.name}</p>`;
				let img = `<img src="${item.person.countryflag}">`;
				let days = `<p class="ISS-days-in-space">${item.spaceDays}</p>`;
				let handle = `<p class="ISS-twitter">${item.handle}</p>`;
				let container = `<div class="ISS-List-Item">
				${title}${img}${days}${handle}
				</div>`;
				content += container;
			});
			
			wrapper.innerHTML = content;
		} else {
			wrapper.innerHTML = "<p>Loading...</p>";
		}

		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-AboardISS.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "ISS-DATA_RESPONSE") {
			payload.forEach(person => console.log(person));
			// set dataNotification
			this.listItems = payload;
			this.updateDom();
		}
	},
});
