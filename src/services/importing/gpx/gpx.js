import { parseGpx, parseGpxFromFile } from "viade-gpx-parse";


function gpxTest() {
    let gpxString = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'
    gpxString += '<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="byHand" version="1.1" '
    gpxString += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    gpxString += 'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">'

    gpxString += '<wpt lat="39.921055008" lon="3.054223107">'
    gpxString += '<ele>12.863281</ele>'
    gpxString += '<time>2005-05-16T11:49:06Z</time>'
    gpxString += '<name>Cala Sant Vicenç - Mallorca</name>'
    gpxString += '<sym>City</sym>'
    gpxString += '</wpt>'
    gpxString += '</gpx>'


    parseSuperString()
    
    const gpxObjetct = parseGpx(string, function(error, data) {
        console.log(error)
        console.log(data)
        console.log(data.metadata)
        console.log(data.tracks)
    })
    
    /*
    parseGpxFromFile("testFile.gpx", function (error, data) {
        console.log(error)
        console.log(data)
        console.log(data.metadata)
        console.log(data.tracks)
    })
    */

}






export default gpxTest;
