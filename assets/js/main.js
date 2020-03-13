$(document).ready(function(){
    loadHistory();
    $("#search").on('submit', function(event) {
        event.preventDefault();
        var searchString = $(event.target).serializeArray()[0].value;
        $('#input_search').val('');
        getWeather(searchString);
        updateHistory(searchString , false);
    });
    
    $(".list-group-item").on('click', function(event){
        console.log($(event.target).text());
        getWeather($(event.target).text());
        getForecast($(event.target).text());
    });
});

function loadHistory(){
    var history = (localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : "";

    if (!history){
        return;
    }

    for (var entry of history){
        updateHistory(entry, true);
    }
}

function updateHistory(searchString, loading){
    var newa = $("<a></a>");
    $(newa).addClass('list-group-item list-group-item-action');
    $(newa).text(searchString);
    $(newa).attr('href',"#");

    $("#searchHistory").prepend(newa);

    if (!loading){
        var history = (localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : "";
        if (!history){
            localStorage.setItem('history', JSON.stringify([searchString]));
        } else {
            console.log(searchString);
            history.push(searchString);
            localStorage.setItem('history', JSON.stringify(history));
        }
    }
}

function updateWeather(data){
    console.log(data);
    $("#city_name").text(data.name + ", " + data.sys.country + ", ");
    $("#todays_date").text(moment().format('DD/MM/YYYY'));
    $("#weather_icon").text(String.fromCodePoint(parseInt("0x" + data.weather[0].icon, 16)));
    $("#temperature").text(" " + (data.main.temp - 273).toFixed(1) + '\u00B0C');
    $("#humidity").text(" " + data.main.humidity + "%");
    $("#windspeed").text(" " + data.wind.speed + " Knots");
}

function updateForecast(data){
    console.log(data);
}

function getWeather(searchString){
    var url = "https://api.openweathermap.org/data/2.5/weather";
    var key = "0954ee1d2912876af9d01bc12c203502";

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            q : searchString,
            appid : key
        },
        success: function(result){
            updateWeather(result);
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getForecast(searchString){
    var url = "https://api.openweathermap.org/data/2.5/forecast";
    var key = "0954ee1d2912876af9d01bc12c203502";

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            q : searchString,
            appid : key
        },
        success: function(result){
            updateForecast(result);
        },
        error: function(error){
            console.log(error);
        }
    });
}