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
	$("#dialogMain").dialog({
		title: "Terminal Modtaget",
		width: "900",
		height: "580",
		position: { my: "left top", at: "left top", of: window }
	
	});

	
	$("#dialogCmd").dialog({
		title: "Terminal Send",
		width: "880",
		height: "100",
		position: { my: "left top+600", at: "left top", of: window }
	
	});

	$("#dialogResponse").dialog({
		title: "Response",
		width: "600",
		height: "100",
		position: { my: "left top+750", at: "left top", of: window }
	
	});

	$("#dialogCmd").html("<input id='inpCmd'><button id='btnCmdSend'>Send</button>");
	$("#dialogCmd").append("<button id='btnDsp1' name='27' class='btnDsp'>ESC</button>");
	$("#dialogCmd").append("<button id='btnDsp2' name='13' class='btnDsp'>CR</button>");
	
	
	
	$("#btnCmdSend").on("click", function(){
		// send command og vis retur data 
		$.get("key?cmd=" + $("#inpCmd").val() , function( data ) {
				$("#dialogResponse").html(data);
		});
	});

	$(".btnDsp").on("click", function(){
		//alert("btnDsp=" + this.name);
		$.get("specialkey?cmd="+ this.name, function( data ) {
				$("#dialogResponse").html(data);
		});
	});

});


function UpdateTerminal() {
		// send command og vis retur data 
		$.get("terminaldata" , function( data ) { $("#dialogMain").html(data);});
}


function switchLED() {
        var button_text = document.getElementById("Lystaste").value;
        if (button_text!="OFF") {
          document.getElementById("Lystaste").value = "OFF";
          ajaxLoad('LEDON','TXT_button');
        } else {
          document.getElementById("Lystaste").value = "ON";
          ajaxLoad('LEDOFF','TXT_button');
        }
} //switchLED




var myVar = setInterval(UpdateTerminal, 1000);

function myTimer() {
   var d = new Date();
   document.getElementById("TXT_button").value = d.toLocaleTimeString();
}

