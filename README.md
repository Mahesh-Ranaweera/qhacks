# GeoTourist

![GeoTourist](https://github.com/Mahesh-Ranaweera/qhacks/blob/master/app_images/geotourist.png "GeoTourist logo")

Found yourself in an unfamiliar place? Don't know what the business you pass by every day actually does? Just curious about what's around you?

GeoTutor is a web app that uses a mobile device's gyroscope and geolocation functionalities for providing location services to the user. Based on the location and direction the device is facing, GeoTourist requests location details from the Google Maps API through by using StdLib functions to construct a location profile for the user. Interface is minimal and easy to use.

Simply point at a point of interest to find out what it's all about! 

## Getting started

Just navigate to [the GeoTourist website](https://geotourist.tech/) on your mobile device.

## Demo

Check out [this YouTube video](https://www.youtube.com/watch?v=aJ8B0QjJwpM).

## Known issues

Currently, the only well-known Android browser that allows you to use the outward facing camera is Firefox.
The app will still display the correct information while using the selfie camera, but you just won't be able to see exactly what you're aiming at.

This app uses a limited Google Maps API token, limited to 1000 requests per day.
This app tries to determine the device location and points of interest every 5 seconds, which, as you could imagine, quickly takes up a lot of requests.
If the requests run out, the information window will be blank.
If this happens, please try again later.

## Authors
   
   * **Travis Madill** ([Github profile](https://github.com/TravisMadill))
   * **Mahesh Ranaweera** - ([Github profile](https://github.com/Mahesh-Ranaweera))
