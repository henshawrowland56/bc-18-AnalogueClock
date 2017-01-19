/*
    ANALOGUE CLOCK DESIGN BY
    HENSHAW ROWLAND
*/
var id;
 window.onload = function () {

    id = setInterval(showClockOnLoad, 1000);

    showClockOnLoad();
    function showClockOnLoad() {
        var date = new Date;
        showClock(date);
    }

}

var timeZoneOffsets = {
    "WAT": [1,"UTC+1"],
    "CET": [1,"UTC+1"],
    "CST": [-6,"UTC-6"],
    "EAT": [3,"UTC+3"],
    "EDT": [-4,"UTC-4"],
    "Fiji": [12,"UTC+12"],
    "GMT": [0,"UTC+0"],
    "Norfolk": [11,"UTC+11"],
    "Nepal": [5.75,"UTC+5:45"],
    "Pyongyang": [8.5,"UTC+8.5"],
    "WestSamoa": [14, "UTC+14"],
    "WAST":[2,"UTC+2"]
}
//FUNCTION TO RETURN TIME ZONE OFFSETS IN ARRAYS
function returnTimeZoneOffset(value) {
    switch(value){
        case 0: return timeZoneOffsets.WAT;
        case 1: return timeZoneOffsets.CET;
        case 2: return timeZoneOffsets.CST;
        case 3: return timeZoneOffsets.EAT;
        case 4: return timeZoneOffsets.EDT;
        case 5: return timeZoneOffsets.Fiji;
        case 6: return timeZoneOffsets.GMT;
        case 7: return timeZoneOffsets.Norfolk;
        case 8: return timeZoneOffsets.Nepal;
        case 9: return timeZoneOffsets.Pyongyang;
        case 10: return timeZoneOffsets.WestSamoa;
        case 11: return timeZoneOffsets.WAST;
    }
} 
function check() {
    var zonesElem = document.getElementById("outputTab").style;
    zonesElem.visibility = "visible";
    var temp = function() {return 1;}
    var temp = window.onload;
    clearInterval(id);
    window.onload = setInterval(generateTime,1000);
}
//FUNCTION TO GENERATE TIME AND DATE USING TIME ZONE OFFSET DATA

function generateTime() {
    var timeZoneElement = document.getElementById("timeZones");
    var timeZone = Number(timeZoneElement.value);
    var tZoneoffset = returnTimeZoneOffset(timeZone);
    //OBTAIN THE CURRENT DATE AND TIME
    var testDate = new Date;
    var localTime = testDate.getTime();

    //FIND THE LOCAL TIME-ZONE OFFSET AND MULTIPLY BY (60000) to convert from minutes to millissecconds
    var localOffset = testDate.getTimezoneOffset() * 60000;

    //OBTAIN THE CURRENT UTC TIME BY ADDING LOCAL TIME ZONE OFFSET TO THE LOCAL TIME
    var utc = localOffset + localTime;
    /*Note: localOffset might return positive or negative depending on if the
        local time-zone is before or behinf the UTC time*/
    var offset = tZoneoffset[0];
    var tZoneInString = tZoneoffset[1];

    var currentTimeInZone = utc + (3600000 * offset);
    /*Note: 360000 represents a converting factor to convert from hours to milliseconds*/
    //CHANGE CALCULATED TIME TO A READABLE DATE/TIME STRING
    var finalDate = new Date(currentTimeInZone);


    var zoneElem = document.getElementById("zone");
    var zoneTimeElem = document.getElementById("zoneTime");
    var curTimeElem = document.getElementById("curTime");
    var zoneDateElem = document.getElementById("zoneDate");
    var curDateElem = document.getElementById("curDate");
    var offsetElem = document.getElementById("offset");
    function toTime(string){
        var arrStr= string.split(' ');
        return arrStr[0];
    }

    zoneElem.innerHTML = timeZoneElement.options[timeZone].innerHTML + " " + tZoneInString;
    zoneTimeElem.innerHTML = toTime(finalDate.toTimeString());
    curTimeElem.innerHTML = toTime(testDate.toTimeString());
    zoneDateElem.innerHTML = finalDate.toDateString();
    curDateElem.innerHTML = testDate.toDateString();
    offsetElem.innerHTML = timeZoneOffsets.WAT[0]===tZoneoffset[0] ? "In your time zone" :offset < 1 ? Math.abs(offset-1) + " hour(s) behind" :  Math.floor(offset-1) +" hour(s) "+(60 *(offset - Math.floor(offset))) +" mins  ahead";

    showClock(finalDate);
}
function showClock(dateInput) {

    //define canvas and its context
    var canvas = document.getElementById("clockCanvas");
    var context = canvas.getContext("2d");
    //var date = new Date;
    var date = dateInput;
    var angleInRadians;
    var clockHandLength = 120;

    //clear everything on canvas and redraw every one second

    context.clearRect(0, 0, canvas.width, canvas.height);

    outerClockFrame();
    clockDialDraw();
    centreDialDraw();
    hourMarkings();
    secondsMarkings();

    secondsMovement(date);
    minutesMovement(date);
    hourMovement(date);

    function outerClockFrame() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, clockHandLength + 10, 0, Math.PI * 2);
        context.strokeStyle = '#444';
        context.lineWidth = 10;
        context.stroke();
    }
    function clockDialDraw() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, clockHandLength + 7, 0, Math.PI * 2);
        context.lineWidth = 2;
        context.fillStyle = 'yellow';
        context.strokeStyle = 'blue';
        context.stroke();
    }
    function centreDialDraw() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
        context.lineWidth = 3;
        context.fillStyle = 'blue';
        context.strokeStyle = 'black';
        context.stroke();
    }
    function hourMarkings() {
        for (var i = 0; i < 12; i++) {
            angleInRadians = (i - 3) * (Math.PI * 2) / 12;
            context.lineWidth = 15;
            context.beginPath();

            var x1 = (canvas.width / 2) + Math.cos(angleInRadians) * (clockHandLength);
            var y1 = (canvas.height / 2) + Math.sin(angleInRadians) * (clockHandLength);
            var x2 = (canvas.width / 2) + Math.cos(angleInRadians) * (clockHandLength - (clockHandLength / 7));
            var y2 = (canvas.width / 2) + Math.sin(angleInRadians) * (clockHandLength - (clockHandLength / 7));

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);

            context.strokeStyle = '#0c010';
            context.stroke();
        }
    }
    function secondsMarkings() {
        for (var i = 0; i < 60; i++) {
            angleInRadians = (i - 3) * (Math.PI * 2) / 60;
            context.lineWidth = 1;
            context.beginPath();

            var x1 = (canvas.width / 2) + Math.cos(angleInRadians) * (clockHandLength);
            var y1 = (canvas.height / 2) + Math.sin(angleInRadians) * (clockHandLength);
            var x2 = (canvas.width / 2) + Math.cos(angleInRadians) * (clockHandLength - (clockHandLength / 30));
            var y2 = (canvas.width / 2) + Math.sin(angleInRadians) * (clockHandLength - (clockHandLength / 30));

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);

            context.strokeStyle = 'purple';
            context.stroke();

        }
    }
    function secondsMovement(dateInput) {
        var sec = date.getSeconds();
        angleInRadians = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
        context.lineWidth = 3;

        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo((canvas.width / 2 + Math.cos(angleInRadians) * clockHandLength),
            (canvas.height / 2 + Math.sin(angleInRadians) * clockHandLength));

        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2 - Math.cos(angleInRadians) * 20, canvas.height / 2 - Math.sin(angleInRadians) * 20);

        context.strokeStyle = 'red';
        context.stroke();
    }
    function minutesMovement(dateInput) {
        var mins = date.getMinutes();
        angleInRadians = ((Math.PI * 2) * (mins / 60)) - ((Math.PI * 2) / 4);
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);

        context.lineTo((canvas.width / 2 + Math.cos(angleInRadians) * clockHandLength / 1.1),
            (canvas.height / 2 + Math.sin(angleInRadians) * clockHandLength / 1.1));

        context.strokeStyle = 'green';
        context.stroke();

    }

     function hourMovement(dateInput) {

        var hour = date.getHours();
        var min = date.getMinutes();
        angleInRadians = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
        context.lineWidth = 12;

        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        // DRAW THE LENGTH.
        context.lineTo((canvas.width / 2 + Math.cos(angleInRadians) * clockHandLength / 1.5),
            canvas.height / 2 + Math.sin(angleInRadians) * clockHandLength / 1.5);

        context.strokeStyle = 'black';
        context.stroke();
    }
    
}
function blue() {
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-blue");
}
function green(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-green");

}
function silver(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-silver");
}
function yellow(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-yellow");
}
function brown(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-brown");
}
function red(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-red");
}
function white(){
    var body = document.getElementById("bodyId");
    body.setAttribute('class',"body-white");
}
