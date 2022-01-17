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
	$("#dialogWakeOnLan").dialog({
		title: "WAKE ON LAN",
		width: "300",
		height: "240",
		position: { my: "left top", at: "left top", of: window }
	
	});


	$("#dialogMain").dialog({
		title: "LYS STYRING/STATUS",
		width: "300",
		height: "600",
		position: { my: "left top", at: "left top", of: window }
	
	});


    $("#dialogMain").append("<input type=button id='LindaKontor' onclick='ToggleStatus(1)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='LilleToilet' onclick='ToggleStatus(2)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='Mellemgang'  onclick='ToggleStatus(3)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='BadBalderkin'  onclick='ToggleStatus(4)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='BadLoft'  onclick='ToggleStatus(5)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='KarstenKontor'  onclick='ToggleStatus(6)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='KokkenBord'  onclick='ToggleStatus(7)' value='' /><br>");
    $("#dialogMain").append("<input type=button id='KokkenVitrine'  onclick='ToggleStatus(8)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='BryggersLoft'  onclick='ToggleStatus(11)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='BryggersBord'  onclick='ToggleStatus(12)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Entre'  onclick='ToggleStatus(13)' value='' /><br>");
	//$("#dialogMain").append("<input type=button id='KokkenLoft'  onclick='ToggleStatus(14)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Fyrrum'  onclick='ToggleStatus(15)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Udestik'  onclick='ToggleStatus(16)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Udelys'  onclick='ToggleStatus(17)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Sovevarelse'  onclick='ToggleStatus(21)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='Stue'  onclick='ToggleStatus(22)' value='' /><br>");
	//$("#dialogMain").append("<input type=button id='AlleLysdamper'  onclick='ToggleStatus(23)' value='' /><br>");
	$("#dialogMain").append("<input type=button id='KokkenLysdamper'  onclick='ToggleStatus(24)' value='' /><br>");
	//$("#dialogMain").append("<input type=button id='StueLoftudtag'  onclick='ToggleStatus(25)' value='' /><br>");
	//$("#dialogMain").append("<input type=button id='StikOpholdsstue'  onclick='ToggleStatus(26)' value='' /><br>");
	//$("#dialogMain").append("<input type=button id='StikAlrum'  onclick='ToggleStatus(27)' value='' /><br>");


	$("#dialogMain").append("<input type=button id='Lystider'  onclick='ToggleStatus(30)' value='30 LOADING..' /><br>");
	GetLystider();

    var LysUpdateVar = setInterval(UpdateLysStatus, 10000);
	UpdateLysStatus();


});



function GetLystider(){
	$.get("SOLTID", function( data ) {
		document.getElementById("Lystider").value = data;	
	});
}

function Show(Output, data){
	switch(Output){
		case 1:
				document.getElementById("LindaKontor").value = data;	
				break;
		case 2:
				document.getElementById("LilleToilet").value = data;	
				break;
		case 3:
				document.getElementById("Mellemgang").value = data;	
				break;
		case 4:
				document.getElementById("BadBalderkin").value = data;	
				break;
		case 5:
				document.getElementById("BadLoft").value = data;	
				break;
		case 6:
				document.getElementById("KarstenKontor").value = data;	
				break;
		case 7:
				document.getElementById("KokkenBord").value = data;	
				break;
		case 8:
				document.getElementById("KokkenVitrine").value = data;	
				break;
		case 11:
				document.getElementById("BryggersLoft").value = data;	
				break;
		case 12:
				document.getElementById("BryggersBord").value = data;	
				break;
		case 13:
				document.getElementById("Entre").value = data;	
				break;
		case 14:
				document.getElementById("KokkenLoft").value = data;	
				break;
		case 15:
				document.getElementById("Fyrrum").value = data;	
				break;
		case 16:
				document.getElementById("Udestik").value = data;	
				break;
		case 17:
				document.getElementById("Udelys").value = data;	
				break;
		case 21:
				document.getElementById("Sovevarelse").value = data;	
				break;
		case 22:
				document.getElementById("Stue").value = data;	
				break;
		case 23:
				document.getElementById("AlleLysdamper").value = data;	
				break;
		case 24:
				document.getElementById("KokkenLysdamper").value = data;	
				break;
		case 25:
				document.getElementById("StueLoftudtag").value = data;	
				break;
		case 26:
				document.getElementById("StikOpholdsstue").value = data;	
				break;
		case 27:
				document.getElementById("StikAlrum").value = data;	
				break;
		default:
		break;
	}
}

function UpdateLysStatus(){
	for (i =0; i < 28; i++){
	GetStatus(i);
	}


}

function GetStatus(Output){
	$.get("STATUS?cmd=" + Output, function( data ) {
		Show(Output,data);
	});
}

function ToggleStatus(Output){
	$.get("TOGGLE?cmd=" + Output, function( data ) {
		Show(Output,data);
	});
}


//var myVar = setInterval(UpdateComputerStatus, 10000);

function UpdateTerminal() {
		// send command og vis retur data 
		$.get("terminaldata" , function( data ) { $("#dialogTerminal").html(data);});
}





//var myVar = setInterval(UpdateTerminal, 5000);


