//
$(document).ready(function(){
	$("#DebugMain").dialog({
		title: "Debug Functions",
		width: "260",
		height: "560",
		position: { my: "left top", at: "left top", of: window }
	
	});

	$("#dialogResponse").dialog({
		title: "Response",
		width: "260",
		height: "280",
		position: { my: "left top+600", at: "left top", of: window }
	
	});


	$("#DebugMain").html("<button id='btnDsp1' name='.SP15,21' class='btnDsp'>Restart</button><br>");
	$("#DebugMain").append("<button id='btnDsp2' name='.SP15,20P15,21' class='btnDsp'>Download Mode</button><br>");
	$("#DebugMain").append("<button id='btnDsp3' name='msdlib?cmd=SendBreak' class='btnMSDLib'>Send Break</button><br>");
	$("#DebugMain").append("<button id='btnDsp3' name='msdlib?cmd=ForceSendBreak' class='btnMSDLib'>Send Break Force</button><br>");	
	$("#DebugMain").append("<button id='btnDsp3' name='msdlib?cmd=RestartMSD' class='btnMSDLib'>MSDRestart</button><br>");		
	$("#DebugMain").append("<button id='btnDsp3' name='msdlib?cmd=WriteKeyboard&key=1' class='btnMSDLib'>Write Key 1</button><br>");		
	$("#DebugMain").append("<button id='btnDsp3' name='msdlib?cmd=WriteKeyboard&key=2' class='btnMSDLib'>Write Key 2</button><br>");		
	$("#DebugMain").append("<button id='btnDsp4' name='msdlib?cmd=WriteKeyboard&key=3' class='btnMSDLib'>Write Key 3</button><br>");

	$(".btnDsp").on("click", function(){
		//alert("btnDsp=" + this.name);
		$.get("serial?cmd="+ this.name, function( data ) {
				$("#dialogResponse").html(data);
		});
	});
	
	$(".btnMSDLib").on("click", function(){
		$.get(this.name, function( data ) {
				$("#dialogResponse").html(data);
		});
	});

});


