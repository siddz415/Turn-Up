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

const optionsTwo = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '142b74e2a0msh1c7996bc1656b54p1c1fcajsnbf29db333a4d',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
async function artistBio2(artistId) {
	
	const response = await fetch('https://spotify23.p.rapidapi.com/artist_overview/?id='+ artistId, optionsTwo)
	return response.json()
}

function artistBio(artistId) {
	fetch('https://spotify23.p.rapidapi.com/artist_overview/?id='+ artistId , optionsTwo)
		.then(function (response) {
			return response.json();
		})
		(function (data) {
			console.log(data);
			


		})
}

//function to pull up artist+albums+songs+playlists
var artistSearch = document.getElementById("search-artist").value
var artistId = null

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
		.then(async function (data) {
			console.log(data)
			const bandName = data.artists.items[0].data.profile.name
			console.log(bandName);
			const trackData = data.tracks.items
			for (let index = 0; index < 3; index++) {
				const track = trackData[index].data;
				console.log(track)
			}

		//	console.log(data.tracks.items[0].data.name)
		//	console.log(data.tracks.items[1].data.name)
		//	console.log(data.tracks.items[2].data.name)
		const playlistData = data.playlists.items
		for (let index = 0; index < 3; index++) {
			const playlist = playlistData[index].data;
			console.log(playlist)
		}
		//	console.log(data.playlists.items[0].data.name)
		//	console.log(data.playlists.items[1].data.name)
		//	console.log(data.playlists.items[2].data.name)
			artistId = data.artists.items[0].data.uri.substring(15)
			const bio = await artistBio2(artistId)
			console.log(bio);
			const bioText =  bio.data.artist.profile.biography.text
			console.log(bioText)
	
					//document.getElementById("artistdisplay").innerHTML=data.artists.items[0].data.profile.name

					
						//fetch('https://spotify23.p.rapidapi.com/artist_overview/?id='+ artistId+ ', optionsTwo')
						//	.then(function (response) {
						//		return response.json();
						//	})
						//	(function (data) {
						//		console.log(data);
					
					
						//	})
					
				
				});

		}

document.getElementById("searchbutton").addEventListener("click", spotifyApi)