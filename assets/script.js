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
//function to pull up artist+albums+songs+playlists
var artistSearch = document.getElementById("search-artist").value
function spotifyApi() {
	var artistSearch = document.getElementById("search-artist").value
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '142b74e2a0msh1c7996bc1656b54p1c1fcajsnbf29db333a4d',
			'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
		}
	};
	console.log(fetch)
	fetch('https://spotify23.p.rapidapi.com/search/?q=' + artistSearch + '&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data)
			console.log(data.artists.items[0].data.profile.name);
			console.log(data.tracks.items[0].data.name)
			console.log(data.tracks.items[1].data.name)
			console.log(data.tracks.items[2].data.name)
			console.log(data.playlists.items[0].data.name)
			console.log(data.playlists.items[1].data.name)
			console.log(data.playlists.items[2].data.name)

					//document.getElementById("artistdisplay").innerHTML=data.artists.items[0].data.profile.name

				});
		}

//beginning of separate fetch function for artist bio
const optionsTwo = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '142b74e2a0msh1c7996bc1656b54p1c1fcajsnbf29db333a4d',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
function artistBio() {
	fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=2w9zwq3AktTeYYMuhMjju8', optionsTwo)
		.then(function (response) {
			return response.json();
		})
		(function (data) {
			console.log(data);


		})
}
document.getElementById("searchbutton").addEventListener("click", spotifyApi)