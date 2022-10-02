//

var database = firebase.database();
const params = new URLSearchParams(window.location.search);

var HentLysTimer = new Timer(function () {
	HentLysStatus();
}, 5000);


function Timer(fn, t) {
	var timerObj = setInterval(fn, t);

	this.stop = function () {
		if (timerObj) {
			clearInterval(timerObj);
			timerObj = null;
		}
		return this;
	}

	// start timer using current settings (if it's not already running)
	this.start = function () {
		if (!timerObj) {
			this.stop();
			timerObj = setInterval(fn, t);
		}
		return this;
	}

	// start with new or original interval, stop current interval
	this.reset = function (newT = t) {
		t = newT;
		return this.stop().start();
	}
}


function formatDate(format) {
	const date = new Date();
	const map = {
		mm: date.getMonth() + 1,
		dd: date.getDate(),
		yy: date.getFullYear().toString().slice(-2),
		yyyy: date.getFullYear()
	}

	return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}

function WriteLog(LogStr) {
	firebase.database().ref('log').child(Date.now()).set({
		String: LogStr
	});
}




$(document).ready(function () {
	var q = 'QUERY:';
	for (const param of params) {
		q = q + param + '|';
	}
	WriteLog(q);

	HentLysTimer.stop();

	if (params.has('log')) { UpdateLog(); }
	if (params.has('eltider')) { ShowEltider(); }
	if (params.has('eltiderdrift')) { ShowEltiderDrift(); }
	if (params.has('units')) { ShowUnits(); }
	if (params.has('lys')) { ShowLight(); }

	if (params.has('help')) {
		var htmls = [];
		htmls.push('<p>log: Last Log data</p><br>');
		htmls.push('<p>eltider: Udlæsning af prisinformationer</p><br>');
		htmls.push('<p>eltiderdrift=[dagetilbage]: Udlæsning af drift per dag, arg = dage tilbage</p><br>');
		htmls.push('<p>units=navn [MASTER,]</p><br>');
		$('#tbody').html(htmls);
	}
});

function HentLysStatus() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;

			database.ref('Hjem/lysstyring').get().then((snapshot) => {
				var value = snapshot.val();
				var updates = {};

				$.each(value, function (index, value) {
					if (value) {
						var postData = {
							navn: value.navn,
							status: false
						};

						if (response[index] == '1') {
						  postData.status = true;
						}

						updates['/lysstyring/'+index] = postData;
					}
				});

				database.ref('Hjem').update(updates);
			});
	  }
	}
	xmlhttp.open("GET", "lysstatus.php", true);
	xmlhttp.send();
}

function ShowLight() {
	HentLysTimer.start();

	database.ref('Hjem/lysstyring').on('value', function (snapshot) {
		var htmls = [];
		var value = snapshot.val();

		htmls.push('<tr><th>No</th><th>Navn</th><th>Status</th></tr>');
		$.each(value, function (index, value) {
			if (value) {
				htmls.push('<tr><td>' + index + '</td><td>' + value.navn + '</td><td>' + value.status + '</td>');
				$('#abody').html(htmls);
			}
		});
	});
}

function ShowEltider() {
	database.ref('Hjem/eltider/tabelstart').on('value', function (snapshot) {
		var tabelstart = snapshot.val();

	   database.ref('Hjem/eltider/').limitToLast(54 - tabelstart).on('value', function (snapshot) {
		   var htmls = [];
		   var value = snapshot.val();
		   //var htmls = [];
		   htmls.push('<tr><th>Time</th><th>Aktiv</th><th>Pris</th></tr>');
		   $.each(value, function (index, value) {
			   if (value) {
				   if (value.aktiv != null) {
					   htmls.push('<tr><td>' + index % 24 + '</td><td>' + value.aktiv + '</td><td>' + value.pris + '</td>');
				   }
			   }
		   });

		   htmls.push('<br>');
		   $('#tbody').html(htmls);
	   });
	});

	database.ref('Hjem/eltider/').limitToLast(7).on('value', function (snapshot) {
		var htmls = [];
		var value = snapshot.val();

		htmls.push('<tr><th>Parameter</th><th>Value</th></tr>');
		$.each(value, function (index, value) {
			//htmls.push('<tr><td>'+index+'</td><td>' + value + '</td>');

			if (index == 'aktive') { htmls.push('<tr><td>Antal valgte tidszoner</td><td>' + value + '</td>'); }
			if (index == 'zoner') { htmls.push('<tr><td>Antal aktive tidszoner</td><td>' + value + '</td>'); }
			if (index == 'minvalue') { htmls.push('<tr><td>Hojest medtagende tidszone</td><td>' + value + '</td>'); }
			if (index == 'opdatering') { htmls.push('<tr><td>Opdateringstid</td><td>' + value + '</td>'); }
			if (index == 'override') { htmls.push('<tr><td>Tidszone override</td><td>' + value + '</td>'); }
			if (index == 'tabelstart') { htmls.push('<tr><td>Tidszone start</td><td>' + value + '</td>'); }
			if (index == 'middelpris') { htmls.push('<tr><td>Middelpris</td><td>' + value + '</td>'); }
			$('#abody').html(htmls);
		});


	});
}
//<input class="w3-input w3-border" type="text" name="mapScale" value="<?php echo $mapScale;?>">

function ShowUnits() {
	database.ref('Hjem/units/').child(params.get("units")).on('value', function (snapshot) {
		var htmls = [];
		var value = snapshot.val();

		htmls.push('<tr><th>Parameter</th><th>Value</th></tr>');
		$.each(value, function (index, value) {
			//htmls.push('<tr><td>'+index+'</td><td>' + value + '</td>');
			
			if (index == 'Sommertid') { htmls.push('<tr><td>Sommertidsflag</td><td><input type="button" value=' + value + ' onclick="ToggleSommertid('+value+')"></td>'); }

			$('#abody').html(htmls);
		});


	});
}

function ToggleSommertid(Val) {
	database.ref('Hjem/units/').child(params.get("units")).update({
		Sommertid: !Val
	});
}


function ShowEltiderDrift() {
	var NoStr = params.get("eltiderdrift");
	var No = 10;
	if (NoStr != "") { No = parseInt(NoStr); }

	database.ref('Hjem/eltiderdage/').limitToLast(No).on('value', function (snapshot) {
		var mvalue = snapshot.val();
		var htmls = [];
		htmls.push('<tr><th>Dato</th><th>Minut</th><th>Pris</th><th>Total</th><th>9:00</th><th>20:00</th></tr>');
		$.each(mvalue, function (index, mvalue) {
			if (mvalue) {
				var pris = Math.trunc(mvalue.pris / mvalue.minutter);
				var total = Math.trunc(mvalue.pris / 60);
				htmls.push('<tr><td>' + index + '</td><td>' + mvalue.minutter + '</td><td>' + pris + '</td><td>' + total + '</td>\
				            <td><input type="numeric" value=' + mvalue.morgentemperatur + ' onchange="MorgenFunction(' + index +',this.value)"></td>\
					        <td><input type="numeric" value=' + mvalue.aftentemperatur +  ' onchange="AftenFunction(' + index +',this.value)"></td>');
			}
		});

		$('#driftbody').html(htmls);
	});
}

function MorgenFunction(index,val) {
	//console.log("The input value has changed. The new value is: ", val, " ", index);
	database.ref('Hjem/eltiderdage').child(index).update({
		morgentemperatur: parseInt(val)
	});
}

function AftenFunction(index, val) {
	//console.log("The input value has changed. The new value is: ", val, " ", index);
	database.ref('Hjem/eltiderdage').child(index).update({
		aftentemperatur: parseInt(val)
	});
}

/*
const driftbody = document.querySelector('#adriftbody');

driftbody.addEventListener('change', function (e) {
	const cell = e.target.closest('td');
	//if ((!cell) && (cell.cellIndex << 2)) { return; } // Quit, not clicked on a cell
	const row = cell.parentElement;
	console.log(row.rowIndex, '  ', cell.cellIndex);

	var index = IndexArr[row.rowIndex];
	console.log(Morgen[row.rowIndex]);
	console.log(cell.innerHTML);
	return;

	database.ref('Hjem/eltiderdage').child(index).update({
		minutter: Minutter[row.rowIndex],
		morgentemperatur: Morgen[row.rowIndex]
		//madtidtemperatur: Middag[row.rowIndex],
		//aftentemperatur: Aften[row.rowIndex],
		//minutter: Minutter[row.rowIndex]
	});
	
});

*/



const mybody = document.querySelector('#tbody');

mybody.addEventListener('click', function (e) {
	const cell = e.target.closest('td');
	if ((!cell) || (cell.cellIndex!=1)) { return; } // Quit, not clicked on a cell

	database.ref('Hjem/eltider/tabelstart').on('value', function (snapshot) {
		var tabelstart = snapshot.val();
		const row = cell.parentElement;
		var Status = false;
		if (cell.innerHTML == 'false') { Status = true; }

		var No = row.rowIndex;
		if (tabelstart != 0) { No += (tabelstart - 1); }
		console.log(No);
		database.ref('Hjem/eltider/'+No+'/').update({
			aktiv: Status
		});
	});
});


function UpdateLog() {
	database.ref('log/').limitToLast(25).on('value', function (snapshot) {
		var value = snapshot.val();
		var htmls = [];
		htmls.push('<tr><th>Time</th><th>Data</th></tr>');
		$.each(value, function (index, value) {
			if (value) {
				var t = index % 60000;
				htmls.push('<tr><td>' + (t / 1000) + '</td><td>' + value.String + '</td>');
			}
		});

		htmls.push('<br><input type=button id="#Delete" onclick="DeleteLog()" value="Delete Log" /><br>');

		$('#tbody').html(htmls);
	});
}

function DeleteLog() {
	document.getElementById("#Delete").value = 'DELETE PRESSED';
	database.ref('log').remove();
	window.location.reload();
}

function ToggleOverride() {
	database.ref('Hjem/eltider/override').get().then((snapshot) => {
		var value = !snapshot.val();
		database.ref('Hjem/eltider').update({
			override:value
		});


	});

}




