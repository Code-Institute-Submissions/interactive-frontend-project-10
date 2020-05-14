function getWorldStats() {
  let url = "https://api.covid19api.com/summary";
  $.when(
    $.getJSON(url)
  ).then(function(result) {
    $("#worldstats").html("<p><br><img src='assets/images/covid.png' class='logo'><p><hr><br>");
    $("#worldstats").append("<h4>LATEST WORLD STATS</h4><p>");
    $("#worldstats").append("<img src='assets/images/mask.png' class='avatar-world'><span style='color:navy'>Total Confirmed: <b>" + formatNumber(result.Global.TotalConfirmed.toString()) + "</b></span><p>");
    $("#worldstats").append("<img src='assets/images/recovered.png' class='avatar-world'><span style='color:green'>Total Recovered: <b>" + formatNumber(result.Global.TotalRecovered.toString()) + "</b></span><p>");
    $("#worldstats").append("<img src='assets/images/death.png' class='avatar-world'><span style='color:red'>Total Deaths: <b>" + formatNumber(result.Global.TotalDeaths.toString()) + "</b></span><p><br><p>");
    $("#covidsign").html("<img src='assets/images/covidsign.png' class='infosign'>");
  });
}

function getCountryStats() {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState == 4) {
      let country = $('#countries').val();

      let summary = JSON.parse(this.responseText);
      summary.Countries.forEach((element, i) => {
        if (element.CountryCode == country) {
          $("#countrystats").css("border", "2px solid navy");
          $("#countrystats").css("border-radius", "5px");
          $("#countrystats").html("<img src='assets/images/mask.png' class='avatar-country'><span style='color:navy'>Confirmed: <b>" + formatNumber(element.TotalConfirmed.toString()) + "</b></span><p>");
          $("#countrystats").append("<img src='assets/images/recovered.png' class='avatar-country'><span style='color:green'>Recovered: <b>" + formatNumber(element.TotalRecovered.toString()) + "</b></span><p>");
          $("#countrystats").append("<img src='assets/images/death.png' class='avatar-country'><span style='color:red'>Deaths: <b>" + formatNumber(element.TotalDeaths.toString()) + "</b></span><br>");
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
    $("#countryinfo").append("<li><b>Language</b>: " + result.languages[0].name + "</li>");
    $("#countryinfo").append("<li><b>Currency</b>: " + result.currencies[0].code + " " + result.currencies[0].name + "</li>");
    $("#countryinfo").append("<li><b>Area</b>: " + formatNumber(result.area.toString()) + " km2</li>");
    $("#countryinfo").append("<li><b>Population</b>: " + formatNumber(result.population.toString()) + "</li>");
    $("#countryinfo").append("<li><b>TimeZone</b>: " + result.timezones[0] + "</li>");
    $("#countryinfo").append("<li><b>Calling Int Code</b>: " + result.callingCodes[0] + "</li>");
    $("#countryinfo").append("<li><b>Internet Domain</b>: " + result.topLevelDomain[0] + "</li>");

    initMap(result.latlng[0], result.latlng[1]);
  });
}

function formatNumber(figure) {
  if (figure.length > 3) {
    let formatted = "";
    let aux = figure.split("");
    aux = aux.reverse();
    for (let i = 0; i < aux.length; i++) {
      if (i % 3 == 0) {
        formatted += "," + aux[i];
      } else {
        formatted += aux[i];
      }
    }
    formatted = formatted.split("");
    formatted = formatted.reverse();
    formatted = formatted.join("");
    let cut = formatted.length - 1;
    formatted = formatted.slice(0, cut);
    return formatted;

  } else {
    return figure;
  }
}