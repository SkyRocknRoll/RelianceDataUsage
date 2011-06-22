var StockWatcher = {
	// Install a timeout handler to install the interval routine

	startup: function()
	{
		this.refreshInformation();
		//window.setInterval(this.refreshInformation, 10*60*1000);
	},

	// Called periodically to refresh the stock information


		

	refreshInformation: function()
	{
		var httpRequest = null;
		var fullUrl = "http://myservices.relianceada.com/datausage/jsp/ProcessCDRRequest?Mdn=7483099313&StartDate=2011-06-20&EndDate=2011-06-22&ProductType=1&RequestType=Query";
		


		function infoReceived()
		{
			var usagePanel = document.getElementById('stockwatcher');
			var output = httpRequest.responseText;
				
			if (output.length)
			{
				// Remove whitespace from the end of the string;
				// this gets rid of the end-of-line characters

					
				var content1 = (function(aHTMLString){
					  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
					    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
					  html.documentElement.appendChild(body);

					  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
					    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
					    .parseFragment(aHTMLString, false, null, body));
						
					  return body;
					})(output);
				
				//alert(content1.getElementsByTagName('table').length);

				//alert(content1.getElementsByTagName('table')[6]);
				
				//output = output.replace(/\W*$/, "");				
				
				// Build the tooltip string

				//var fieldArray = output.split(",");
var TotalUsageMB = content1.getElementsByTagName('table')[0].getElementsByTagName('td')[26].getElementsByTagName('center')[0].innerHTML+"MB";
var TotalUsageGB = content1.getElementsByTagName('table')[0].getElementsByTagName('td')[27].getElementsByTagName('center')[0].innerHTML+"GB";
var peakMB = content1.getElementsByTagName('table')[2].getElementsByTagName('td')[8].getElementsByTagName('span')[0].innerHTML+"MB";
var peakGB = content1.getElementsByTagName('table')[2].getElementsByTagName('td')[9].getElementsByTagName('span')[0].innerHTML+"GB";
var offPeakMB = content1.getElementsByTagName('table')[2].getElementsByTagName('td')[12].getElementsByTagName('span')[0].innerHTML+"MB";
var offPeakGB = content1.getElementsByTagName('table')[2].getElementsByTagName('td')[13].getElementsByTagName('span')[0].innerHTML+"GB";

				usagePanel.label = "NetConnect+ USAGE: " + TotalUsageMB+ " | "+TotalUsageGB ;

				usagePanel.tooltipText = "PeakHours: " +peakMB+" = "+ peakGB+ " | " +"OffPeakHours: " +offPeakMB+" = "+ offPeakGB ;
				

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
