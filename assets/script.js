const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Paris&minDate=2022-05-20&maxDate=2022-05-30&page=1",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "1aa6f1f1bcmsh8b7cce1c9244574p1dcb15jsn326b507b3527",
		"X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});