const apiKey = 'YOUR_LASTFM_API_KEY'; // Замените на ваш API ключ Last.fm

// Функция для отображения треков
function displayTracks(tracks) {
    const musicList = document.getElementById('musicList');
    musicList.innerHTML = ''; // Очистить текущий список

    tracks.forEach(track => {
        const listItem = document.createElement('li');
        listItem.textContent = `${track.name} - ${track.artist}`;
        musicList.appendChild(listItem);
    });
}

// Функция для поиска треков
function searchTracks() {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput) {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchInput)}&api_key=${apiKey}&format=json`)
            .then(response => response.json())
            .then(data => {
                const tracks = data.results.trackmatches.track;
                displayTracks(tracks);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    } else {
        displayTracks([]); // Очистить список, если поле пустое
    }
}

// Добавление обработчика события для поиска
document.getElementById('searchInput').addEventListener('input', searchTracks);

