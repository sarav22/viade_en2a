

function parseSuperString() {
    var string = "";
    string += '<gpx creator="GPS Visualizer https://www.gpsvisualizer.com/" version="1.0">';
    string += '<wpt lat="45.44283" lon="-121.72904">';
    string += '<ele>1374';
    string += '</ele>';
    string += '<name>Vista Ridge Trailhead ';
    string += '</name>';
    string += '<sym> Trail Head';
    string += '</sym>';

    string += '</wpt>';
    string += '<wpt lat="45.41000" lon="-121.71349">';
    string += '<ele>1777';
    string += '</ele>';
    string += '<name>Wy East Basin';
    string += '</name>';

    string += '</wpt>';
    string += '<wpt lat="45.41124" lon="-121.70404">';
    string += '<ele>1823';
    string += '</ele>';
    string += '<name>Dollar Lake';
    string += '</name>';

    string += '</wpt>';
    string += '<wpt lat="45.39260" lon="-121.69937">';
    string += '<ele>2394';
    string += '</ele>';
    string += '<name>Barrett Spur';
    string += '</name>';
    string += '<sym>Summit';
    string += '</sym>';

    string += '</wpt>';

    string += '</gpx>';

    return string;

}

export default parseSuperString;