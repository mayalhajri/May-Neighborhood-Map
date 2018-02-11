# May Neighborhood Map

Included is a list of great restaurants and Cafe around Prince Muhammad Bin Abdulaziz Rd , Riyadh 
The app allows you to filter the list down, and in return displays the locations on the map along with some additional info pulled from Foursquare where available (such as Name of Place  , street name , category and city.

![alt text](https://i.imgur.com/xdwLtlg.png)
## Open web page :
* Open index.html to run the web application
* or you can open website throuuh this link
* https://mayalhajri.github.io/May-Neighborhood-Map/

## The "myLocations" 
is a list of all the restaurants' and Cafes basic location info (name, lattitude longitude , type)
```JavaScript
var myLocations = [
    {
        title: 'Wadek',
        lat: 24.69607645,
        lng: 46.69427633,
        type: 'Restaurant'
    },
    {
        title: 'dipndip',
        lat: 24.70406917,
        lng: 46.70363188,
        type: 'Restaurant'
    },
    {
        title: 'TSC Signature',
        lat: 24.70180787,
        lng: 46.6918838,
        type:  'Restaurant'
    },
    {
        title: 'Nino',
        lat: 24.69790897,
        lng: 46.68681979,
        type:  'Restaurant'
    },
    {
        title: 'White Garden Cafe',
        lat: 24.69402944,
        lng: 46.68390155,
        type: 'Cafe'
    }
] 
```

## "populateInfoWindow" funcation.
1. It will get all basic info(Name of Place  , street name , category and city) from Foursquare's API
2. It will change all the info into a unified format
3. Using ko.computed to determine whether to show the restaurant on the map
4. Add "click" event on the "maker" to show basic info

## initMap
display specific range at google map and also set  a marker on specific places that got from myLocation array objects 

## AppViewModel:
1. It will create the map on screen
3. The searchTerm is a "ko.observable" to hold the searchTerm
4. "this.locationsFilter" is "ko.computed" function which will determine whether to show the restaurant and cofes on the map

## Tools
* Knockout.js
* Bootstrap
* jQuery
* Google Map API
* Foursquare's API
