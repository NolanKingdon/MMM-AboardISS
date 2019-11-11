/* Magic Mirror
 * Node Helper: MMM-AboardISS
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "ISS-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			this.sendData("Hey"); //Is possible send objects :)
		}
	},

	// Example function send notification test
	sendData: function(payload) {
		this.sendSocketNotification("MMM-AboardISS-DATA_RESPONSE", payload);
	}
});
