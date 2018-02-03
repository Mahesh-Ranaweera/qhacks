//import { error } from 'util';

const lib = require('lib');
const request = require('request')

var apiKey = 'AIzaSyAg9XLgcTbHCBxlMAKlQWTi_t_DowldU_g';
var angleTolerance = 5.0;

/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
	Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}

/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
	Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}

/**
* A basic Hello World function
* @param {number} lat GPS latitude
* @param {number} lng GPS longitude
* @param {number} heading Compass heading
* @returns {object}
*/
module.exports = (lat = 0.0, lng = 0.0, heading = 0, context, callback) => {
	request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&key=${apiKey}`, (err, resp, body) => {
		if(err) return callback(new Error(err));

		let reslist = JSON.parse(body);
		if(reslist.status != 'OK') return callback(new Error(body));


		let earthRadius = 6371e3;
		let oLatR = lat.toRadians();
		let oLngR = lng.toRadians();
		let placeList = []
		for(let i = 0; i < reslist.results.length; i++){ //Build selection list
			let dLatR = reslist.results[i].geometry.location.lat.toRadians();
			let dLngR = reslist.results[i].geometry.location.lat.toRadians();
			let latDiff = dLatR - oLatR;
			let lngDiff = dLngR - oLngR;

			//Distance
			let a = Math.sin(latDiff/2) * Math.sin(latDiff/2)
				+ Math.cos(oLatR) * Math.cos(dLatR)
				* Math.sin(lngDiff/2) * Math.sin(lngDiff/2)
			let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			let distance = earthRadius * c;

			//Angle
			let y = Math.sin(lngDiff) * Math.cos(dLatR);
			let x = Math.cos(oLatR) * Math.sin(dLatR)
				- Math.sin(oLatR) * Math.cos(dLatR) * Math.cos(dLngR);
			let angle = (Math.atan2(y, x)+360)%360;

			placeList.push({
				place_id: reslist.results[i].place_id,
				distance: distance,
				angle: angle
			});
		}

		//Determine best from list
		let best = 0;
		for(let index = 1; index < placeList.length; index++){
			if(heading-angleTolerance < placeList[index].angle < heading+angleTolerance){
				if(placeList[index].distance > placeList[best].distance || best == 0)
					best = index;
			}
		}

		request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeList[best].place_id}&key=${apiKey}`, (err, resp, body) => {
			if(err) return callback(new Error(`Could not retrieve information for ${placeList[best].place_id}: ${err}`));

			let placeInfo = JSON.parse(body);
			if(placeInfo.status != 'OK') if(err) return callback(new Error(`Could not retrieve information for ${placeList[best].place_id}: ${placeInfo}`));

			return callback(null, placeInfo);
		});
	});

	//return callback(new Error("Init failed"));
};
