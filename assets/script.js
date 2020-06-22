var APIKey =  "7e4876cc54c80515bdb4c7d98c7616bc";
var cities = ["Melbourne,AU","sydney,AU"];



function displayWeatherInfo(){
  var city = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + APIKey;


// testing ajax
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

  
    

    var cityDiv = $("<div class='city'>");
    var cityName = $("<h2>").text(response.name);
    var temp=$("<p>").text("Temperature: " + response.main.temp + " degree");
    var Humitidy=$("<p>").text("Humidity: " + response.main.humidity +"%");
    var wind=$("<p>").text("Wind Speed: " + response.wind.speed + "KMh");
    
    // if (weather == "clouds"){
    //   weatherPic = "http://openweathermap.org/img/wn/03d@2x.png";
    //  }else if (weather == "clear"){
    //   weatherPic = "http://openweathermap.org/img/wn/01d@2x.png"
    //  }else{
    //   weatherPic = "http://openweathermap.org/img/wn/09d@2x.png"
    //  };
    //  console.log(weatherPic)
  

    cityDiv.append(temp);
    cityDiv.append(cityName, temp, Humitidy, wind);
    

    

    $("#weatherInfo").empty();
    $("#weatherInfo").append(cityDiv);

  });
}

// adding buttons when Search is entered
  function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

      var a = $("<button>");
      a.addClass("city-btn");
      a.attr("data-name", cities[i]);
      a.text(cities[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#add-city").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();
    cities.push(city);
    renderButtons();
  });
  
  function displayWeatherForecast(){
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response2) {
      console.log(response2);
      $("#forecast").empty();
      // var forecastHeading = $("<h2>Weather Forecast</h2>");
      for(var i = 0; i<40; i+=8){
        console.log("is working");
        
      
      
      var forecastDiv = $("<div class='futureForecast col-2.4'>").css({"border-radius": "25px",
        "border": "2px solid #73AD21",
        "padding": "20px", 
        "width": "200px",
        "height": "150px",
        "float": "left" });
      var date = $("<p>").text(response2.list[i].dt_txt.slice(0,11));
      var temp = $("<p>").text("Temperature: " + response2.list[i].main.temp);
      var humidity = $("<p>").text("Humidity: " + response2.list[i].main.humidity);
      forecastDiv.append(date,temp,humidity);
    
    
    $("#forecast").append(forecastDiv);

  }
  
    });
  }
  
  $(document).on("click", ".city-btn", displayWeatherInfo);
  $(document).on("click", ".city-btn", displayWeatherForecast);

  renderButtons();
  
  











