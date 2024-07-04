document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    const countryInfoDiv = document.getElementById('countryInfo');

    // Fetch and populate the country dropdown
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2; // Country code
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country list:', error));

    // Fetch and display the country information
    countrySelect.addEventListener('change', () => {
        const countryCode = countrySelect.value;
        if (countryCode) {
            fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                .then(response => response.json())
                .then(data => {
                    const country = data[0];
                    const currencyInfo = country.currencies ? 
                        Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') : 
                        'N/A';
                    const borders = country.borders ? country.borders.join(', ') : 'No neighboring countries';
                    const timezones = country.timezones.join(', ');

                    countryInfoDiv.innerHTML = `
                        <h2>${country.name.common}</h2>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Subregion:</strong> ${country.subregion}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                        <p><strong>Currency:</strong> ${currencyInfo}</p>
                        <p><strong>Borders:</strong> ${borders}</p>
                        <p><strong>Timezones:</strong> ${timezones}</p>
                        <p><strong>Flag:</strong> <br><img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 100px; height: auto;"></p>
                        <p><strong>Google Maps:</strong> <a href="${country.maps.googleMaps}" target="_blank">View on Google Maps</a></p>
                    `;
                })
                .catch(error => console.error('Error fetching country info:', error));
        } else {
            countryInfoDiv.innerHTML = '';
        }
    });
});
