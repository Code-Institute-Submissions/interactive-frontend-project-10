function getCountryStats() {
  let xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      let country = $('#countries').val();

      let summary = JSON.parse(this.responseText);
      summary.Countries.forEach((element, i) => {
        if (element.CountryCode == country) {
          $("#panel").html("<li>" + i + ": " + element.Country + "</li>");
          $("#panel").append(
            "<li>Total Confirmed: " + element.TotalConfirmed + "</li>"
          );
          $("#panel").append(
            "<li>Total Deaths: " + element.TotalDeaths + "</li>"
          );
        }
      });
    }
  });

  xhr.open("GET", "https://api.covid19api.com/summary");

  xhr.send();
}

function getCountryFacts() {

  let country = $('#countries').val();
  let url = "https://restcountries.eu/rest/v2/alpha/" + country;
  $.when(
    $.getJSON(url)
  ).then(function(result){
    $("#panel").html("<img src=" + result.flag + " alt='Flag' class='flag'>");
    $("#panel").append("<li>Contry: " + result.name + "</li>");
    $("#panel").append("<li>Capital: " + result.capital + "</li>");
    $("#panel").append("<li>Continent: " + result.region + "</li>");
    $("#panel").append("<li>SubRegion: " + result.subregion + "</li>");
    $("#panel").append("<li>Area: " + result.area + "</li>");
    $("#panel").append("<li>Population: " + result.population + "</li>");
    $("#panel").append("<li>TimeZone: " + result.timezones[0] + "</li>");

    getCountryPicture(result.name, result.capital, "symbol");
    getCountryPicture(result.name, result.capital, "building");
    getCountryPicture(result.name, result.capital, "park");

    initMap(result.latlng[0], result.latlng[1]);
  });
}