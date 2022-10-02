

var database = firebase.database();
const params = new URLSearchParams(window.location.search);
var file = params.get('file');
var nonvalidfile;


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




