/* global Module */

/* Magic Mirror
 * Module: MMM-AboardISS
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-AboardISS", {
	defaults: {
		updateInterval: 60000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	/**
	 * Start function - fires off when module first loads
	 */
	start: function() {
		var self = this;
		console.log("Starting");
		console.log(this);
		let req = this.sendSocketNotification("MMM-AboardISS-DATA_REQUEST");
		let data = "Hello";
		this.sendSocketNotification("ISS-NOTIFICATION_TEST", data);
		this.sendSocketNotification("MMM-AboardISS-DATA_REQUEST");
		console.log(req);
		// Schedule update timer.
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
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
			self.dataRequest = this.sendSocketNotification("MMM-AboardISS-DATA_REQUEST");
		}, nextLoad);
	},

	getDom: function() {
		var self = this;
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		// If this.dataRequest is not empty
		if (this.dataRequest) {
			var wrapperDataRequest = document.createElement("div");
			// check format https://jsonplaceholder.typicode.com/posts/1
			wrapperDataRequest.innerHTML = this.dataRequest.title;

			var labelDataRequest = document.createElement("label");
			// Use translate function
			//             this id defined in translations files
			labelDataRequest.innerHTML = this.translate("TITLE");

			wrapper.appendChild(labelDataRequest);
			wrapper.appendChild(wrapperDataRequest);
		}

		// Data from helper
		if (this.dataNotification) {
			var wrapperDataNotification = document.createElement("div");
			// translations  + datanotification
			wrapperDataNotification.innerHTML =  this.translate("UPDATE") + ": " + this.dataNotification.date;

			wrapper.appendChild(wrapperDataNotification);
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
		if(notification === "MMM-AboardISS-DATA_RESPONSE") {
			console.log(payload);
			// set dataNotification
			this.dataNotification = payload;
			// this.updateDom();
		}
	},
});
