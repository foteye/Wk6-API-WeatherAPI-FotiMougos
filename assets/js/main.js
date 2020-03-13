$(document).ready(function(){
    loadHistory();
});


$("#search").on('submit', function(event) {
    event.preventDefault();
    var searchString = $(event.target).serializeArray()[0].value;
    $('#input_search').val('');
    searchWeather(searchString);
    updateHistory(searchString , false);
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

function searchWeather(searchString){
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
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
    });
}