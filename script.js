const searchInput = document.getElementById('search');
const artistNameElem = document.getElementById('artist-name');
const artistImageElem = document.getElementById('artist-image');
const songsListElem = document.getElementById('songs-list');
const videosListElem = document.getElementById('videos-list');

// Sample data
const artists = {
    'The Weeknd': {
        image: 'https://example.com/weeknd.jpg',
        songs: ['Blinding Lights', 'Save Your Tears', 'Starboy'],
        videos: ['https://www.youtube.com/embed/4NRXx6U8ABQ', 'https://www.youtube.com/embed/XXYlFuWEuKI']
    },
    'Taylor Swift': {
        image: 'https://example.com/taylor.jpg',
        songs: ['Love Story', 'You Belong With Me', 'Blank Space'],
        videos: ['https://www.youtube.com/embed/8xg3vE8Ie_E', 'https://www.youtube.com/embed/e-ORhEE9VVg']
    }
};

// Handle search input
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const artist = Object.keys(artists).find(artist => artist.toLowerCase().includes(searchTerm));

    if (artist) {
        displayArtistInfo(artist);
    } else {
        clearArtistInfo();
    }
});

function displayArtistInfo(artist) {
    const artistData = artists[artist];
    
    artistNameElem.textContent = artist;
    artistImageElem.src = artistData.image;

    // Display songs
    songsListElem.innerHTML = '';
    artistData.songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        songsListElem.appendChild(li);
    });

    // Display videos
    videosListElem.innerHTML = '';
    artistData.videos.forEach(videoUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        videosListElem.appendChild(iframe);
    });
}

function clearArtistInfo() {
    artistNameElem.textContent = '';
    artistImageElem.src = '';
    songsListElem.innerHTML = '';
    videosListElem.innerHTML = '';
}
