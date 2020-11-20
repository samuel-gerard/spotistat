(function () {
	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */

	var CURRENT_PERIOD = 'short_term';
	var CURRENT_LIMIT = '10';

	function getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	function retrieveTracks() {
		$.ajax({
			url: `https://api.spotify.com/v1/me/top/tracks?limit=${CURRENT_LIMIT}&time_range=${CURRENT_PERIOD}`,
			headers: {
				Authorization: 'Bearer ' + access_token
			},
			success: function (response) {
				var data = {
					trackList: response.items,
				};

				let displayTracks = formatTracksData(data.trackList);

				clearStats();
				displayTrackStats(displayTracks);
			},
		});
	}

	function formatTracksData(trackList)
	{
		let trackInfos = [];

		for(let i = 0; i < trackList.length; i++)
		{
			var track = new Object();

			let name = trackList[i].name;
			let images = trackList[i].album.images;
			let artists = trackList[i].artists;

			track.name = name.toUpperCase()
			track.image = images[0].url
			track.artists = '';

			for(let y = 0; y < artists.length; y++)
			{
				track.artists += artists[y].name

				if(artists[y+1] != undefined)
				{
					track.artists += artists[y].name + ', '
				}
			}

			trackInfos.push(track)
		}

		return trackInfos;
	}

	function displayTrackStats(displayTracks)
	{
		for(let i = 0; i < displayTracks.length; i++)
		{
			var trackDiv = document.createElement("div");
			trackDiv.classList.add('track-info');

			trackDiv.appendChild(displayTrackName(displayTracks[i]));
			trackDiv.appendChild(displayTrackArtists(displayTracks[i]));
			trackDiv.appendChild(displayTrackImage(displayTracks[i]));

			$('.container-spotistat').append(trackDiv);
		}
	}

	function displayTrackName(trackInfos)
	{
		var trackNameDiv = document.createElement("div");
		var trackName = document.createTextNode(trackInfos.name);
		trackNameDiv.appendChild(trackName);
		trackNameDiv.classList.add('track-name');

		return trackNameDiv;
	}

	function displayTrackImage(trackInfos)
	{
		var trackImgDiv = document.createElement("img");
		trackImgDiv.setAttribute('src', trackInfos.image);
		trackImgDiv.classList.add('track-img');

		return trackImgDiv;
	}

	function displayTrackArtists(trackInfos)
	{
		var trackArtistsDiv = document.createElement("div");
		var trackArtists = document.createTextNode(trackInfos.artists);
		trackArtistsDiv.appendChild(trackArtists);
		trackArtistsDiv.classList.add('track-artists');

		return trackArtistsDiv;
	}

	function clearStats()
	{
		$('.container-spotistat').empty();
	}

	var params = getHashParams();

	var access_token = params.access_token,
		refresh_token = params.refresh_token,
		error = params.error;

	if (error) {
		alert('There was an error during the authentication');
	} else {
		if (access_token) {
			$.ajax({
				url: 'https://api.spotify.com/v1/me',
				headers: {
					Authorization: 'Bearer ' + access_token
				},
				success: function (response) {
					$('#login').hide();
					$('#loggedin').show();
					$('.profil-name').html('Hello ' + response.display_name + ' !')
					$('.profil-name').attr('href', response.external_urls['spotify'])
					$('.user-img').css('background-image', 'url('+response.images[0].url+')')
					retrieveTracks();
				}
			});
		} else {
			// render initial screen
			$('#login').show();
			$('#loggedin').hide();
		}

		$('#short_term').on('click', function() {
			CURRENT_PERIOD = 'short_term';
			$('#short_term').css('background-color', 'black');
			$('#medium_term').css('background-color', '#1ED760');
			$('#long_term').css('background-color', '#1ED760');
			retrieveTracks();
		});

		$('#medium_term').on('click', function() {
			CURRENT_PERIOD = 'medium_term';
			$('#short_term').css('background-color', '#1ED760');
			$('#medium_term').css('background-color', 'black');
			$('#long_term').css('background-color', '#1ED760');
			retrieveTracks();
		});

		$('#long_term').on('click', function() {
			CURRENT_PERIOD = 'long_term';
			$('#short_term').css('background-color', '#1ED760');
			$('#medium_term').css('background-color', '#1ED760');
			$('#long_term').css('background-color', 'black');
			retrieveTracks();
		});

		$('#count-tracks').on('change', function() {
			CURRENT_LIMIT = $('#count-tracks option:selected').val();
			retrieveTracks();
		});

		$('.button-cta').on('click', function() {
			window.location.href='/login';
		});

	}
})();
