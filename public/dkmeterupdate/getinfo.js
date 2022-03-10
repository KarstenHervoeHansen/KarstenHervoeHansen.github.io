// Complete Project Details at: https://RandomNerdTutorials.com/

//const params = new URLSearchParams(window.location.search);

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
//id = 10230dff72abde0c33ef91e8f2a875c6 & packageid=28 & deviceid=210 & serial=35163
// Attach an asynchronous callback to read the data
database.ref('exeinfo/0/EXEVerMajor').on('value', (snapshot) => {
    document.getElementById("EXEVerMajor").innerHTML = formatDate('dd-mm-yy')+snapshot.val();
});

database.ref('exeinfo/0/EXEVerMinor').on('value', (snapshot) => {
    document.getElementById("EXEVerMinor").innerHTML = snapshot.val();
});

database.ref('exeinfo/0/EXEVerRelease').on('value', (snapshot) => {
    document.getElementById("EXEVerRelease").innerHTML = snapshot.val();
});

database.ref('exeinfo/0/EXEVerBuild').on('value', (snapshot) => {
    document.getElementById("EXEVerBuild").innerHTML = snapshot.val();
});

database.ref('exeinfo/0/EXEReleaseDate').on('value', (snapshot) => {
    document.getElementById("EXEReleaseDate").innerHTML = snapshot.val();
});




