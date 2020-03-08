import Comment from '../../domain/domainClasses';
import GPX from 'gpx-parser-builder';
import { RouteSpec, TrackPoint } from 'react-router-dom';


class GpxParser {

	/**
	 * Receives s STRING representing the file, and returns a domain route object
	 * @param {*} fileString the string representing the file.
	 * @returns A RouteSpec instance, from domainClasses.js
	 */
	parse(fileString) {
		const gpx = GPX.parse(fileString); //We get the gpx object with the library
		const listaRutas = [];
		const route = {};


		gpx.trk.forEach(trk => {
			route.name = trk.name;
			route.waypoints = [];
			trk.trkseg.forEach(trkseg => {
				trkseg.trkpt.forEach(trkpt => {
					route.waypoints.push(new TrackPoint(trkpt.name, trkpt.lat, trkpt.lng)
                        /*{ 
						"name":trkpt.name
						"lat":trkpt.lat,
						"lng":trkpt.lng,
                    }*/
					);
				});
			});
			listaRutas.push(new RouteSpec({
				name: route.name,
				itineray: route.waypoints
			}));
		});

		return listaRutas[0] //We are returning the first route, because of view problems. TECHNICAL DEBT
	}
}

export default gpxParser;


