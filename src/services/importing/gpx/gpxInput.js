function parseSuperString() {
    var string = ""
    string += '<gpx creator="GPS Visualizer https://www.gpsvisualizer.com/" version="1.0">'
    string += '<wpt lat="45.44283" lon="-121.72904">'
    string += '<ele>1374'
    string += '</ele>'
    string += '<name>Vista Ridge Trailhead '
    string += '</name>'
    string += '<sym> Trail Head'
    string += '</sym>'

    string += '</wpt>'
    string += '<wpt lat="45.41000" lon="-121.71349">'
    string += '<ele>1777'
    string += '</ele>'
    string += '<name>Wy East Basin'
    string += '</name>'

    string += '</wpt>'
    string += '<wpt lat="45.41124" lon="-121.70404">'
    string += '<ele>1823'
    string += '</ele>'
    string += '<name>Dollar Lake'
    string += '</name>'

    string += '</wpt>'
    string += '<wpt lat="45.39260" lon="-121.69937">'
    string += '<ele>2394'
    string += '</ele>'
    string += '<name>Barrett Spur'
    string += '</name>'
    string += '<sym>Summit'
    string += '</sym>'

    string += '</wpt>'
    
    string += '<trk>'
    string += '<name>Barrett Spur 1'
    string += '</name>'
    string += '<desc>Uy como esto funcione xD'
    string += '</desc>'
    string += '<extensions>'
    string += '<line xmlns="http://www.topografix.com/GPX/gpx_style/0/2">'
    string += '<color>9900ff'
    string += '</color>'

    string += '</line>'

    string += '</extensions>'
    string += '<trkseg>'
    string += '<trkpt lat="45.4431641" lon="-121.7295456">'
    string += '<ele>1777'
    string += '</ele>'

    string += '</trkpt>'
    string += '<trkpt lat="45.4428615" lon="-121.7290800">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4425697" lon="-121.7279085">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4424274" lon="-121.7267360">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4422017" lon="-121.7260429">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4416576" lon="-121.7252347">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4406144" lon="-121.7241181">'
    string += '</trkpt>'
    string += '</trkseg>'



    string += '</trk>'
    string += '<trk>'
    string += '<name>Barrett Spur 2'
    string += '</name>'
    string += '<trkseg>'
    string += '<trkpt lat="45.3928201" lon="-121.6995658">'
    string += '</trkpt>'
    string += '<trkpt lat="45.3935449" lon="-121.6998805">'
    string += '</trkpt>'
    string += '<trkpt lat="45.3937897" lon="-121.6997710">'
    string += '</trkpt>'


    string += '</trkseg>'
    string += '<trkseg>'
    string += '<trkpt lat="45.4055556" lon="-121.7058619">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4057016" lon="-121.7055424">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4064672" lon="-121.7058247">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4065550" lon="-121.7056490">'
    string += '</trkpt>'
    


    string += '</trkseg>'
    string += '<trkseg>'
    string += '<trkpt lat="45.4099747" lon="-121.7134529">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4110685" lon="-121.7158641">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4121873" lon="-121.7171940">'
    string += '</trkpt>'
    string += '<trkpt lat="45.4131063" lon="-121.7179663">'
    string += '</trkpt>'



    string += '</trkseg>'

    string += '</trk>'

    string += '</gpx>'

    return string;

}

export default parseSuperString;