
const params = new URLSearchParams(window.location.search);

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

database.ref('exeinfo/0').on('value', (snapshot) => {
    var db = snapshot.val();
    document.getElementById("EXEVerInfo").innerHTML = formatDate('dd-mm-yy') + db.EXEVerMajor + db.EXEVerMinor+db.EXEVerRelease+db.EXEVerBuild+db.EXEReleaseDate;
});




