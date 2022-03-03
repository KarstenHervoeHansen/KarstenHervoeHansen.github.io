//
// Object 
var DeviceData = {
	isRunning: false,
	deviceResponceTime: 0,
	deviceName: "N/A",
	deviceVersion: "N/A",
}

/*
	Getters / Setters
*/
DeviceData.SetDeviceResponceTime = function(ms) {
	if(ms != undefined) {
		var d = new Date();
		this.deviceResponceTime = ms;
		$("#DeviceResponceTime").html(d.getTime()-ms + " ms. getTime=" + d.getTime() );
	} else {
		//alert("Ups");
	}
}

DeviceData.GetDeviceResponceTime = function() {
	return this.deviceResponceTime;
}

DeviceData.SetDeviceName = function(name) {
	this.deviceName = name;
	$("#DeviceName").html(name);
}

DeviceData.SetDeviceVersion = function(version) {
	this.deviceVersion = version;
	$("#DeviceVersion").html(version);
}

DeviceData.Start = function() {
	var d = new Date();
	this.isRunning = true;
	this.PullData(d.getTime());
}

DeviceData.Stop = function() {
	this.isRunning = false;
}




// hent data - AJAX funktion
DeviceData.PullData = function(count) {
	var obj = this;
	$.get( "json.php?counter=" + count, function( data ) {
		obj.SetDeviceName(data.DeviceName);
		obj.SetDeviceVersion(data.DeviceVersion);
		obj.SetDeviceResponceTime(data.DeviceResponceTime);
		
		if(obj.isRunning) {
			setTimeout(function(){
				var d = new Date();
				obj.PullData(d.getTime());
			}, 100); // pause = 100ms
		}
	},
	"json" );
}




//
$(document).ready(function(){
	/*
    $("#btnStart").click(function(){
        DeviceData.Start();
    });

    $("#btnStop").click(function(){
        DeviceData.Stop();
    });
	*/
	
	// start on load
	//(DeviceData.Start();
	
	
	
	
	
	$("#dialogMain").dialog({
		title: "Main",
		width: "600",
		height: "600",
		position: { my: "left top", at: "left top", of: window }
	
	});

	
	$("#dialogCmd").dialog({
		title: "Command",
		width: "400",
		height: "100",
		position: { my: "left top", at: "right+10 top-100", of: "#dialogMain" }
	
	});

	$("#dialogCmd").html("<input id='inpCmd'><button id='btnCmdSend'>Send</button>");
	
	
	$("#btnCmdSend").on("click", function(){
		// send command og vis retur data 
		$.get("cmd.asp?cmd=" + $("#inpCmd").val() , function( data ) {
				$("#dialogMain").html(data);
		});
	});
	


	

	
	$("#dialogMeter").dialog({
		title: "Meter controls",
		width: "600",
		height: "100",
		position: { my: "left top", at: "left bottom", of: window}
	
	});
	
	$("#dialogMeter").append("<button id='btnDsp1' name='1' class='btnDsp'>Key1</button>");
	$("#dialogMeter").append("<button id='btnDsp2' name='2' class='btnDsp'>Key2</button>");
	$("#dialogMeter").append("<button id='btnDsp3' name='3' class='btnDsp'>Key3</button>");
	$("#dialogMeter").append("<button id='btnDsp4' name='4' class='btnDsp'>Key4</button>");
	$("#dialogMeter").append("<button id='btnDsp5' name='5' class='btnDsp'>Key5</button>");
	$("#dialogMeter").append("<button id='btnDsp6' name='6' class='btnDsp'>Key6</button>");
	$("#dialogMeter").append("<button id='btnDsp7' name='7' class='btnDsp'>Key7</button>");
	$("#dialogMeter").append("<button id='btnDsp8' name='8' class='btnDsp'>Key8</button>");

	$(".btnDsp").on("click", function(){
		//alert("btnDsp=" + this.name);
		$.get("cmd.asp?cmd=/dspcmd 3 0 " + this.name + " 2", function( data ) {
				$("#dialogMain").html(data);
		});
	});

	

});



/*
var count = 0;
setInterval(function() {
	count++;
	$("#timer").html(count);
}, 1000);
*/
