//
$(document).ready(function(){
	$("#SystemMain").dialog({
		title: "System Functions",
		width: "260",
		height: "560",
		position: { my: "right top", at: "right top", of: window }
	
	});


	
	$("#SystemMain").html("<button id='btnDsp1' name='.SP15,21' class='btnDsp'>Restart</button><br>");
	$("#SystemMain").append("<button id='btnDsp2' name='.SP15,20P15,21' class='btnDsp'>Download Mode</button><br>");
	$("#SystemMain").append("<button id='btnDsp3' name='msdlib?cmd=SendBreak' class='btnMSDLib'>Send Break</button><br>");
	$("#SystemMain").append("<button id='btnDsp3' name='msdlib?cmd=ForceSendBreak' class='btnMSDLib'>Send Break Force</button><br>");	
	$("#SystemMain").append("<button id='btnDsp3' name='msdlib?cmd=RestartMSD' class='btnMSDLib'>MSDRestart</button><br>");		


	$(".btnDsp").on("click", function(){
		//alert("btnDsp=" + this.name);
		$.get("serial?cmd="+ this.name, function( data ) {
				$("#dialogResponse").html(data);
		});
	});
	


});


