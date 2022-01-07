//
$(document).ready(function(){
	$("#SoftkeysMain").dialog({
		title: "MSD Softkeys",
		width: "680",
		height: "100",
		position: { my: "right top", at: "left bottom", of: window }
	});
	

	
	$("#SoftkeysMain").append("<button id='btnSoftkey1' name='msdlib?cmd=WriteKeyboard&key=1' class='btnMSDLib softkeybutton'>Key 1</button>");		
	$("#SoftkeysMain").append("<button id='btnSoftkey2' name='msdlib?cmd=WriteKeyboard&key=2' class='btnMSDLib softkeybutton'>Key 2</button>");		
	$("#SoftkeysMain").append("<button id='btnSoftkey3' name='msdlib?cmd=WriteKeyboard&key=3' class='btnMSDLib softkeybutton'>Key 3</button>");
	$("#SoftkeysMain").append("<button id='btnSoftkey4' name='msdlib?cmd=WriteKeyboard&key=4' class='btnMSDLib softkeybutton'>Key 4</button>");		
	$("#SoftkeysMain").append("<button id='btnSoftkey5' name='msdlib?cmd=WriteKeyboard&key=5' class='btnMSDLib softkeybutton'>Key 5</button>");		
	$("#SoftkeysMain").append("<button id='btnSoftkey6' name='msdlib?cmd=WriteKeyboard&key=6' class='btnMSDLib softkeybutton'>Key 6</button>");	
	$("#SoftkeysMain").append("<button id='btnSoftkey7' name='msdlib?cmd=WriteKeyboard&key=7' class='btnMSDLib softkeybutton'>Key 7</button>");		
	$("#SoftkeysMain").append("<button id='btnSoftkey8' name='msdlib?cmd=WriteKeyboard&key=8' class='btnMSDLib softkeybutton'>Key 8</button>");		

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


