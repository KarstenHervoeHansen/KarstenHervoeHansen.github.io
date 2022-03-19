

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


// get.html?exever
if (params.has('exever')) {
    database.ref('exeinfo/0').on('value', (snapshot) => {
        var db = snapshot.val();
        var response = formatDate('dd-mm-yy') + db.EXEVerMajor + db.EXEVerMinor + db.EXEVerRelease + db.EXEVerBuild + db.EXEReleaseDate;
        document.write(response);
        WriteLog(response);
    });
}

database.ref('updates/nonvalid/UpdatePath').on('value', (snapshot) => {
    nonvalidfile = snapshot.val();

});

//get.html?id=10230dff72abde0c33ef91e8f2a875c6&packageid=28&deviceid=210&serial=35163
// reponse:
//210|28|2017 - 07 - 13|This package contain software version 2017 - 07 - 13. It also contain firmware for the MCU, the ARM Processor and FPGA.|/home/n115288 / download / software / dkt7 / T7FactoryUpdate(2017 - 07 - 13 - ID28).CDP|/home/n115288 / download / software / dkt7 / T7Software
database.ref('updates/' + params.get('deviceid')).on('value', (snapshot) => {
    if (params.has('id')) {
        var db = snapshot.val();

        var factorypath = db.FactoryPath;
        var updatepath = db.UpdatePath;
        var updateminid = db.UpdateMinID;

        if (factorypath == "") { factorypath = "0"; }
        if (updatepath == "") { updatepath = "0"; }
        if (params.get('packageid') < updateminid) { updatepath = "0"; }

        document.getElementById("Response").innerHTML = params.get('deviceid') + '|' + db.PackageID + '|' + db.ReleaseDate + '|' + db.ReleaseInfo + '|'+factorypath+'|'+updatepath;
    }
});

function WriteRecord(deviceid, serial, oldpackageid, newpackageid, factory, mcubl, mcurun, armid, armrun, sdiin, sdiout, aesin, aesout, swoption0, swoption1, swoption2, swoption3) {
    firebase.database().ref('unitdownloads').child(deviceid).child(serial).child(Date.now()).set({
        OldPackageID: oldpackageid,
        NewPackageID: newpackageid,
        FACTORY: factory,
        MCUBL: mcubl,
        MCURUN: mcurun,
        ARMID: armid,
        ARMRUN: armrun,
        SDI_IN: sdiin,
        SDI_OUT: sdiout,
        AES_IN: aesin,
        AES_OUT: aesout,
        SWOPA: swoption0,
        SWOPB: swoption1,
        SWOPC: swoption2,
        SWOPD: swoption3
    });
}




// get.html?deviceid=208&serial=10140
database.ref('units').child(params.get('deviceid')).child(params.get('serial')).get().then((snapshot) => {
    if (snapshot.exists()) {
        var newpackageid = params.get('newpackageid');
        if (params.has('id') == 0) {
            var db = snapshot.val();
            if (db == 1) {
                // only serial number defined as validation
            } else {
                // unit validated for access
            }
        }
    } else {
        // unit not granted
        file = nonvalidfile;
        newpackageid = 0;
    }
    WriteRecord(params.get('deviceid'), params.get('serial'), params.get('oldpackageid'), newpackageid, params.get('factory'),
        params.get('mcubl'), params.get('mcurun'), params.get('armrun'), params.get('armid'),
        params.get('sdiin'), params.get('sdiout'), params.get('aesin'), params.get('aesout'),
        params.get('swoption0'), params.get('swoption1'), params.get('swoption2'), params.get('swoption3'));
    document.getElementById("Response").innerHTML = 'file transfer:' + file;



}).catch((error) => {
    document.getElementById("Response").innerHTML = -2;
});

//deviceid=210&serial=35163&oldpackageid=28&newpackageid=28&factory=0&mcubl=01.00&mcurun=01.54&armrun=0203&armid=0001&sdiin=1&sdiout=1&aesin=3&aesout=3&swoption0=134&swoption1=204&swoption2=217&swoption3=83&file=T7.CDP




