// util

var ajaxRequest = null;
if (window.XMLHttpRequest) {
     ajaxRequest =new XMLHttpRequest();
} else {
     ajaxRequest =new ActiveXObject("Microsoft.XMLHTTP");
}



function ajaxLoad(ajaxURL, ResponseWindow) {
   if (!ajaxRequest) {
	   alert("AJAX is not supported.");
	   return;
   }

   ajaxRequest.open("GET",ajaxURL,true);
       ajaxRequest.onreadystatechange = function() {
           if(ajaxRequest.readyState == 4 && ajaxRequest.status==200) {
              var ajaxResult = ajaxRequest.responseText;
              document.getElementById(ResponseWindow).value = ajaxRequest.responseText;
           }

   }
    ajaxRequest.send();
} //ajaxLoad

//
$(document).ready(function(){

	
});
//
$(document).ready(function(){

	$("#dialogWakeOnLan").dialog({
		title: "WAKE ON LAN",
		width: "500",
		height: "240",
		position: { my: "left top", at: "left top", of: window }
	
	});

	$("#dialogVarmestyring").dialog({
		title: "VARMESTYRING",
		width: "300",
		height: "190",
		position: { my: "left top+260", at: "left top", of: window }
	
	});

	$("#dialogLysstyring").dialog({
		title: "LYS TIDER",
		width: "300",
		height: "100",
		position: { my: "left top+480", at: "left top", of: window }
	
	});

	$("#dialogWakeOnLan").append("<input type=button id='WakeOnLan1'  onclick='WakeOnLan(1)' value='1 LOADING..' /><br>");
	$("#dialogWakeOnLan").append("<input type=button id='WakeOnLan2'  onclick='WakeOnLan(2)' value='2 LOADING..' /><br>");
	$("#dialogWakeOnLan").append("<input type=button id='WakeOnLan3'  onclick='WakeOnLan(3)' value='3 LOADING..' /><br>");
	$("#dialogWakeOnLan").append("<input type=button id='WakeOnLan4'  onclick='WakeOnLan(4)' value='4 LOADING..' /><br><br>");

	$("#dialogWakeOnLan").append("<input type=button id='WakeOnLan0'    onclick='WakeOnLan(0)' value='0 LOADING..' /><br>");

	$("#dialogVarmestyring").append("<input type=button id='WakeOnLan10'    onclick='WakeOnLan(10)' value='10 LOADING..' /><br>");

	$("#dialogVarmestyring").append("<input type=button id='WakeOnLan5'	 onclick='WakeOnLan(5)' value='5 LOADING..' /><br>");
	$("#dialogVarmestyring").append("<input type=button id='WakeOnLan11'    onclick='WakeOnLan(11)' value='11 LOADING..' /><br>");
	$("#dialogVarmestyring").append("<input type=button id='WakeOnLan12'    onclick='WakeOnLan(12)' value='12 LOADING..' /><br>");
	$("#dialogLysstyring").append("<input type=button id='WakeOnLan13'    onclick='WakeOnLan(13)' value='13 LOADING..' /><br>");

	//UpdateComputerStatus();
	var ComputerVar = setInterval(UpdateComputerStatus, 10000);

   //ajaxLoad('STATUS','TXT_button');

});

function ShowWake(Output, data){
	switch(Output){
		case 0:
				document.getElementById("WakeOnLan0").value = data;	
				break;
		case 1:
				document.getElementById("WakeOnLan1").value = data;	
				break;
		case 2:
				document.getElementById("WakeOnLan2").value = data;	
				break;
		case 3:
				document.getElementById("WakeOnLan3").value = data;	
				break;
		case 4:
				document.getElementById("WakeOnLan4").value = data;	
				break;
		case 5:
				document.getElementById("WakeOnLan5").value = data;	
				break;

		case 10:
				document.getElementById("WakeOnLan10").value = data;	
				break;
		case 11:
				document.getElementById("WakeOnLan11").value = data;	
				break;
		case 12:
				document.getElementById("WakeOnLan12").value = data;	
				break;
		case 13:
				document.getElementById("WakeOnLan13").value = data;	
				break;
		default:
		break;
	}
}

function WakeOnLan(ComputerNo){
	$.get("WAKEONLAN?cmd=" + ComputerNo, function( data ) {
		ShowWake(ComputerNo,data);
	});
}

function GetWakeStatus(ComputerNo){
	$.get("WAKESTATUS?cmd=" + ComputerNo, function( data ) {
		ShowWake(ComputerNo,data);
	});
}

function UpdateComputerStatus(){
	for (i =0; i < 6; i++){
	GetWakeStatus(i);
	}

	for (i =10; i < 14; i++){
	GetWakeStatus(i);
	}
}
function togglestatus() {
   ajaxLoad('TOGGLE','TXT_button');
} //togglestatus



//var myVar = setInterval(UpdateStatus, 10000);

function UpdateStatus(){
   ajaxLoad('STATUS','TXT_button');
}

