document.addEventListener('DOMContentLoaded', function() {  
    const infoText = document.getElementById('introText');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    let markers = [];
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    document.getElementById('map').style.filter = 'grayscale(50%)';

    fetch('tools/resources.json')
        .then(response => response.json())
        .then(resources => {
            resources.forEach(location => {
                const coordinates = location.info.match(/Coordinates: ([-.\d]+),([-.\d]+)/);
                if (coordinates) {
                    const lat = parseFloat(coordinates[2]);
                    const lon = parseFloat(coordinates[1]);
                    const marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(`<strong>${location.name}</strong><br>${location.info}`);
                    markers.push({ name: location.name, marker: marker });
                }
            });

            searchBar.addEventListener('input', () => {
                const query = searchBar.value;
                searchResults.innerHTML = '';

                const matchedMarkers = markers.filter(entry => entry.name.toLowerCase().includes(query.toLowerCase()));

                if (matchedMarkers.length > 0) {
                    searchResults.style.display = 'block';
                    matchedMarkers.forEach(match => {
                        const div = document.createElement('div');
                        div.classList.add('search-item');
                        div.textContent = match.name;
                        div.addEventListener('click', () => {
                            infoText.textContent = `Selected Location: ${match.name}
Info: ${match.marker.getPopup().getContent().split('<br>')[1]}`;
                            map.setView(match.marker.getLatLng(), 10);
                            match.marker.openPopup();
                            searchResults.style.display = 'none';
                            searchBar.value = '';
                        });
                        searchResults.appendChild(div);
                    });
                } else {
                    searchResults.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error loading resources:', error));
});