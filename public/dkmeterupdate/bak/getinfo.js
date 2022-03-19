const params = new URLSearchParams(window.location.search);

const deviceid = params.get('deviceid');
const packageid = params.get('packageid');
const serial = params.get('serial');

var sDevType;
var factorypath;

//id=10230dff72abde0c33ef91e8f2a875c6&packageid=28&deviceid=210&serial=35163
//210 | 28 | 2017 - 07 - 13 | This package contain software version 2017 - 07 - 13. It also contain firmware for the MCU, the ARM Processor and FPGA.| /home/n115288 / download / software / dkt7 / T7FactoryUpdate(2017 - 07 - 13 - ID28).CDP | /home/n115288 / download / software / dkt7 / T7Software

database.ref('updates/' + deviceid+'/DevType').on('value', (snapshot) => {
    sDevType = snapshot.val()+'|0';
    //document.write(packageid);
    //document.getElementById("GetSWAEx").innerHTML = sDevType;
    document.getElementById("GetSWAEx").innerHTML = sDevType;
});

database.ref('updates/' + deviceid + '/FactoryPath').on('value', (snapshot) => {
    factorypath = snapshot.val() + '|0';
    //document.write(packageid);
    //document.getElementById("GetSWAEx").innerHTML = sDevType;
    document.getElementById("GetFactoryPath").innerHTML = factorypath;
});








