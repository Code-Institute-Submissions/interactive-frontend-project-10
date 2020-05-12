function getWorldStats() {
  let url = "https://api.covid19api.com/summary";
  $.when(
    $.getJSON(url)
  ).then(function(result) {
    $("#worldstats").html("<p><br><img src='assets/images/covid.png' class='logo'><p><hr><br>");
    $("#worldstats").append("<h4>LATEST WORLD STATS</h4><p>");
    $("#worldstats").append("<img src='assets/images/mask.png' class='avatar-world'><span style='color:navy'>Total Confirmed: <b>" + result.Global.TotalConfirmed + "</b></span><p>");
    $("#worldstats").append("<img src='assets/images/recovered.png' class='avatar-world'><span style='color:green'>Total Recovered: <b>" + result.Global.TotalRecovered + "</b></span><p>");
    $("#worldstats").append("<img src='assets/images/death.png' class='avatar-world'><span style='color:red'>Total Deaths: <b>" + result.Global.TotalDeaths + "</b></span><p><br><p>");
    $("#covidsign").html("<img src='assets/images/covidsign.png' class='infosign'>");
  });
}

function getCountryStats() {
  let xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState == 4) {
      let country = $('#countries').val();

      let summary = JSON.parse(this.responseText);
      summary.Countries.forEach((element, i) => {
        if (element.CountryCode == country) {
          $("#countrystats").html("<img src='assets/images/mask.png' class='avatar-country'><span style='color:navy'>Confirmed: <b>" + element.TotalConfirmed + "</b></span><p>");
          $("#countrystats").append("<img src='assets/images/recovered.png' class='avatar-country'><span style='color:green'>Recovered: <b>" + element.TotalRecovered + "</b></span><p>");
          $("#countrystats").append("<img src='assets/images/death.png' class='avatar-country'><span style='color:red'>Deaths: <b>" + element.TotalDeaths + "</b></span><br>");
        }
      });
      getCountryFacts();
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
  ).then(function(result) {
    $("#countryflag").html("<img src=" + result.flag + " alt='Flag' class='flag'>");
    $("#countryinfo").html("<li><b>Capital</b>: " + result.capital + "</li>");
    $("#countryinfo").append("<li><b>Continent</b>: " + result.region + "</li>");
    $("#countryinfo").append("<li><b>SubRegion</b>: " + result.subregion + "</li>");
    $("#countryinfo").append("<li><b>Member of</b>: " + result.regionalBlocs[0].name + "</li>");
    $("#countryinfo").append("<li><b>Area</b>: " + result.area + " km2</li>");
    $("#countryinfo").append("<li><b>Population</b>: " + result.population + "</li>");
    $("#countryinfo").append("<li><b>TimeZone</b>: " + result.timezones[0] + "</li>");
    $("#countryinfo").append("<li><b>Calling Int Code</b>: " + result.callingCodes[0] + "</li>");
    $("#countryinfo").append("<li><b>Internet Domain</b>: " + result.topLevelDomain[0] + "</li>");
    $("#countryinfo").append("<li><b>Currency</b>: " + result.currencies[0].code + " " + result.currencies[0].name + "</li>");
    $("#countryinfo").append("<li><b>Language</b>: " + result.languages[0].name + "</li>");

    initMap(result.latlng[0], result.latlng[1]);
  });
}