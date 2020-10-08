(function () {
	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */

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

	function retrieveTracks(timeRangeSlug, domNumber, domPeriod) {
		$.ajax({
			url: `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=${timeRangeSlug}`,
			headers: {
				Authorization: 'Bearer ' + access_token
			},
			success: function (response) {
				
				var data = {
					trackList: response.items,
				};

				console.log(data.trackList)

				// TODO

			},
		});
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
				}
			});
		} else {
			// render initial screen
			$('#login').show();
			$('#loggedin').hide();
		}

		document.getElementById('short_term').addEventListener('click', retrieveTracks('short_term', 1, 'LAST MONTH'), false);
		document.getElementById('medium_term').addEventListener('click', retrieveTracks('medium_term', 2, 'LAST 6 MONTHS'), false);
		document.getElementById('long_term').addEventListener('click', retrieveTracks('long_term', 3, 'ALL TIME'), false);
	}
})();
