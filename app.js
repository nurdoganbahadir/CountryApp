const countries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    const searchInput = document.querySelector("#searchInput");
    const searchList = document.querySelector("#searchDiv");
    const countryInfo = document.querySelector("#countryInfo");

    //*ülke isimlerini bir liste içersine alıyoruz
    const countryNames = data.map((country) => country.name.common);

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      searchList.innerHTML = "";

      const filteredList = countryNames.filter((name) =>
        name.toLowerCase().includes(searchTerm)
      );

      filteredList.forEach((name) => {
        const listItem = document.createElement("span");
        listItem.textContent = name;
        listItem.className = "list";
        searchList.appendChild(listItem);
        listItem.addEventListener("click", () => {
          searchInput.value = name;
          searchList.innerHTML = "";

          const selectedCountry = data.find(
            (country) => country.name.common === name
          );
          const currencies = selectedCountry.currencies
            ? Object.values(selectedCountry.currencies)
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ")
            : "Bilgi yok";

          const languages = selectedCountry.languages
            ? Object.values(selectedCountry.languages)
                .map((langs) => `${langs}`)
                .join(",")
            : "none";
          // const borders = selectedCountry.borders ? Object.values(selectedCountry.borders).map((border) => )
          document.querySelector(".countries").innerHTML = `
          <div class="card shadow-lg" style="width: 22rem">
          <img src="${
            selectedCountry.flags.png
          }" class="card-img-top shadow" alt="..." />
          <div>
            <h5 class="p-2 text-center">${selectedCountry.name.common}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <i class="fa-solid fa-earth-oceania"></i
              ><span class="fw-bold"> Region:</span> ${selectedCountry.region}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-landmark"></i>
              <span class="fw-bold"> Capitals:</span> ${selectedCountry.capital}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-comments"></i>
              <span class="fw-bold"> Languages:</span> ${languages}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-money-bill-wave"></i>
              <span class="fw-bold"> Currencies:</span> ${currencies}
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i>
              <span class="fw-bold"> Population:</span> ${
                selectedCountry.population
              }
            </li>
            <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold"> Borders:</span> ${
                selectedCountry.borders || "none"
              }
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i
              ><span class="fw-bold"> Map:</span>
              <a href="${
                selectedCountry.maps.googleMaps
              }" target="_blank"> Go to google map</a>
            </li>
            </ul>
            </div>
          
          
          
          
          `;
        });
      });
    });
  } catch (err) {
    console.log("hata", err);
  }
};

countries();
