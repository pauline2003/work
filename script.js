const API = "https://restcountries.com/v2/all";

document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries-container");
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");

  let countriesData = [];

  // Fetch countries from the API
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      displayCountries(data);
    })
    .catch((error) => console.error("Error fetching countries:", error));

  // Display countries
  function displayCountries(countries) {
    countriesContainer.innerHTML = countries
      .map(
        (country) => `
<div class="country" data-name="${country.name}">
<img src="${country.flag}" alt="Flag of ${country.name}">
<h2>${country.name}</h2>
<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
<p><strong>Region:</strong> ${country.region}</p>
<p><strong>Capital:</strong> ${country.capital}</p>
</div>
        `
      )
      .join("");
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter((country) =>
      country.name.toLowerCase().includes(searchValue)
    );
    displayCountries(filteredCountries);
  });

  // Filter functionality
  filterSelect.addEventListener("change", () => {
    const filterValue = filterSelect.value;
    const filteredCountries = filterValue
      ? countriesData.filter((country) => country.region === filterValue)
      : countriesData;
    displayCountries(filteredCountries);
  });

  // Handle country click to show details
  countriesContainer.addEventListener("click", (e) => {
    const countryName = e.target.closest(".country")?.dataset.name;
    if (countryName) {
      const country = countriesData.find((c) => c.name === countryName);
      showCountryDetails(country);
    }
  });

  // Show country details (simplified)
  function showCountryDetails(country) {
    const countryDetails = `
<div class="country-details">
<img src="${country.flag}" alt="Flag of ${country.name}">
<h2>${country.name}</h2>
<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
<p><strong>Region:</strong> ${country.region}</p>
<p><strong>Capital:</strong> ${country.capital}</p>
<p><strong>Border Countries:</strong> ${
      country.borders ? country.borders.join(", ") : "None"
    }</p>
<button onclick="closeDetails()">Close</button>
</div>
        `;
    document.body.innerHTML = countryDetails;
  }

  // Close country details (simplified)
  window.closeDetails = function () {
    location.reload();
  };
});
