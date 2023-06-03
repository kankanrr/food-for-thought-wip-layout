document.getElementById("weather_search").addEventListener("click", function(){

    var city = document.getElementById("weather_city").value
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=60ebe634619c5700bf67dc2646a55408&units=imperial"

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
        document.getElementById("current_city").innerText ="Weather for " + city
        document.getElementById("current_date").innerText ="Day: " +  dayjs.unix(data.list[0].dt).format("M/D")
        document.getElementById("current_temp").innerText = data.list[0].main.temp + "°"
        document.getElementById("current_icon").src = "https://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon +".png"
        document.getElementById("weather_city").value = ""
    })
}
)