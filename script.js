const clientId = 'your_spotify_client_id'; // Replace with your Spotify Client ID
const clientSecret = 'your_spotify_client_secret'; // Replace with your Spotify Client Secret
const youtubeApiKey = 'your_youtube_api_key'; // Replace with your YouTube API Key

// Get Spotify token for authentication
async function getSpotifyToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

// Fetch artist data from Spotify API
async function fetchArtistData(artistName) {
    const token = await getSpotifyToken();

    const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    if (data.artists.items.length === 0) {
        alert('Artist not found');
        return null;
    }
    const artist = data.artists.items[0];
    return artist;
}

// Fetch top tracks for the artist from Spotify
async function fetchTopTracks(artistId) {
    const token = await getSpotifyToken();

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.tracks.map(track => track.name);
}

// Fetch YouTube videos for the artist
async function fetchYoutubeVideos(artistName) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${artistName}%20music%20video&type=video&key=${youtubeApiKey}`);
    const data = await response.json();

    const videos = data.items.map(item => `https://www.youtube.com/embed/${item.id.videoId}`);
    return videos;
}

// Display artist info on the UI
function displayArtistInfo(artist, tracks, videos) {
    const artistNameElem = document.getElementById('artist-name');
    const artistImageElem = document.getElementById('artist-image');
    const songsListElem = document.getElementById('songs-list');
    const videosListElem = document.getElementById('videos-list');

    // Set artist name and image
    artistNameElem.textContent = artist.name;
    artistImageElem.src = artist.images[0]?.url || 'placeholder-image-url';

    // Display top tracks
    songsListElem.innerHTML = '';
    tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track;
        songsListElem.appendChild(li);
    });

    // Display videos
    videosListElem.innerHTML = '';
    videos.forEach(videoUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        iframe.width = "100%";
        iframe.height = "300px";
        videosListElem.appendChild(iframe);
    });
}

// Handle search input
document.getElementById('search').addEventListener('input', async function () {
    const artistName = document.getElementById('search').value.trim();

    if (artistName === '') return;

    // Fetch artist data from Spotify
    const artist = await fetchArtistData(artistName);

    if (artist) {
        const tracks = await fetchTopTracks(artist.id);
        const videos = await fetchYoutubeVideos(artistName);

        // Display data in UI
        displayArtistInfo(artist, tracks, videos);
    }
});
