//
$(document).ready(function(){
	$("#ApplicationMain").dialog({
		title: "Application List",
		width: "260",
		height: "580",
		position: { my: "left top", at: "left top", of: window }
	
	});

	$("#dialogResponse").dialog({
		title: "Response",
		width: "260",
		height: "280",
		position: { my: "left top+600", at: "left top", of: window }
	
	});


	$("#ApplicationMain").html("<button id='btnDsp1' name='27' class='btnDsp'>Audio Globals</button><br>");
	$("#ApplicationMain").append("<button id='btnDsp2' name='27' class='btnDsp'>System Informations</button><br>");
	

	
	$("#btnCmdSend").on("click", function(){
		// send command og vis retur data 
		$.get("key?cmd=" + $("#inpCmd").val() , function( data ) {
				$("#dialogResponse").html(data);
		});
	});

	$(".btnDsp").on("click", function(){
		//alert("btnDsp=" + this.name);
		$.get("serial?cmd="+ this.name, function( data ) {
				$("#dialogResponse").html(data);
		});
	});

});


