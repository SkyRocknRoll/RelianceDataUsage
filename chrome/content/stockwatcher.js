var StockWatcher = {
	// Install a timeout handler to install the interval routine

	startup: function()
	{
		this.refreshInformation();
		window.setInterval(this.refreshInformation, 10*60*1000);
	},

	// Called periodically to refresh the stock information

	refreshInformation: function()
	{
		var httpRequest = null;
		var fullUrl = "http://quote.yahoo.com/d/quotes.csv?f=sl1d1t1c1ohgv&e=.csv&s=GOOG";
		
		function infoReceived()
		{
			var samplePanel = document.getElementById('stockwatcher');
			var output = httpRequest.responseText;
				
			if (output.length)
			{
				// Remove whitespace from the end of the string;
				// this gets rid of the end-of-line characters

				output = output.replace(/\W*$/, "");				
				
				// Build the tooltip string

				var fieldArray = output.split(",");
				samplePanel.label = "GOOG: " + fieldArray[1];
				samplePanel.tooltipText = "Chg: " + fieldArray[4] + " | " +
						"Open: " + fieldArray[5] + " | " +
						"Low: " + fieldArray[6] + " | " +
						"High: " + fieldArray[7] + " | " +
						"Vol: " + fieldArray[8];
			}
		}
		
		httpRequest = new XMLHttpRequest();
		
		httpRequest.open("GET", fullUrl, true);
		httpRequest.onload = infoReceived;
		httpRequest.send(null);
	}
}

// Install load handler

window.addEventListener("load", function(e) { StockWatcher.startup(); }, false);
