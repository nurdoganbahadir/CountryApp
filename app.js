const countries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    const searchInput = document.querySelector("#searchInput");
    const searchList = document.querySelector("#searchDiv");

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
      });
    });
  } catch (err) {
    console.log("hata", err);
  }
};

countries();
