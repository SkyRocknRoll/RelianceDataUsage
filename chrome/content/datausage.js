var DataUsage = {
	// Install a timeout handler to install the interval routine

	startup: function()
	{
		
		this.refreshInformation();
		//window.setInterval(this.refreshInformation, 10*60*1000);
	},

	// Called Onclick to fetch the details from Reliance DB


		

	refreshInformation: function()
	{
		
     		
		var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);

		prefs = prefs.getBranch("extensions.RelianceDataUsage.");


		var mdn = prefs.getCharPref("MdnNumber");
		var billStartdate = prefs.getCharPref("StartdatePref");
		if(mdn == null || mdn=="") {
		mdn=prompt("Enter Your Mdn Number : Ex:9876543210","");
		if(mdn== null || mdn ==""){
		return;}
		prefs.setCharPref("MdnNumber",mdn)
		}
		if(billStartdate == null || billStartdate=="") {
		billStartdate=prompt("Enter Billing Start Date(1-31). Normally you can find it in your bill","");
		if(billStartdate== null || billStartdate ==""){
		return;}
		prefs.setCharPref("StartdatePref",billStartdate)
		}
		var httpRequest = null;
		var date = new Date();
		var startDate;
		if(date.getDate() <billStartdate){

		if(date.getMonth() == 0) {
		startDate = (date.getFullYear() -1)+"-"+"12"+"-"+billStartdate;
		}else {
		startDate = date.getFullYear()+"-"+date.getMonth()+"-"+billStartdate;
		}

		}else{
		startDate = date.getFullYear()+"-"+(date.getMonth() + 1 )+"-"+billStartdate;
		}

		
		var endDate = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();

		

		var fullUrl = "http://myservices.relianceada.com/datausage/jsp/ProcessCDRRequest?Mdn="+mdn+"&StartDate="+startDate+"&EndDate="+endDate+"&ProductType=1&RequestType=Query";
		
		function infoReceived()
		{
			var usagePanel = document.getElementById('DataUsagePanel');
			var output = httpRequest.responseText;
			usagePanel.label = "No Data :(";
				
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
	
			//alert(fullUrl);
			//alert(content1.innerHTML);
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

			x = TotalUsageGB.split(".");
			if (x[0] =="" ) 
			gb ="."+x[1].split("")[0]+x[1].split("")[1];
			else
			gb = x[0]+"."+ x[1].split("")[0]+x[1].split("")[1];
			
			usagePanel.label = "NetConnect+: " + TotalUsageMB.split(".",1)+"MB"+ " | "+gb+"GB" ;

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

//window.addEventListener("load", function(e) { DataUsage.startup(); }, false);
