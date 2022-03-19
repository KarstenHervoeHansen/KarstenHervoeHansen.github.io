//

$(document).ready(function () {
	var q = 'QUERY:';
	for (const param of params) {
		q = q + param + '|';
	}
	WriteLog(q);

	if (params.has('exeinfo')) {
		database.ref('exeinfo/').on('value', function (snapshot) {
			var value = snapshot.val();
			var htmls = [];
			htmls.push('<tr><th>Idx</h><th>File Name</th><th>Release Date</th><th>Build</th><th>Major</th><th>Minor</th><th>Release</th></tr>');
			$.each(value, function (index, value) {
				if (value) {
					htmls.push('<tr><td>' + index + '</td><td>' + value.EXEName + '</td><td>' + value.EXEReleaseDate + '</td>\
						<td>'+ value.EXEVerBuild + '</td><td>' + value.EXEVerMajor + '</td><td>' + value.EXEVerMinor + '</td><td>' + value.EXEVerRelease + '</td>');
				}
			});
			$('#tbody').html(htmls);
		});
	}

	if (params.has('log')) {UpdateLog(); }

	if (params.has('help')) {
		var htmls = [];
		htmls.push('<p>exeinfo: PC App file information</p>');
		htmls.push('<p>log: Last Log data</p><br>');
		$('#tbody').html(htmls);
	}


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




