$.ajax({
  method: 'GET',
  url: 'http://api.ipstack.com/check?access_key=3bbfe95ac22f81c7dc94c445060d239d',
  success: function(data){
   $("body").prepend("<div id='header'><h4 id='country'>"+data.city+", "+data.country_name+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.country_code+"/shiny/64.png'></div>")
   console.log(data)  
}
})

$("#search").on("click",function() {
  var pais = $("#input").val();
  pais=encodeURI(pais)
  $url="http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es"
  $("#container").empty();
  $("#container").append("<div class='spinner-border'></div>")
    $.ajax({
      method: 'GET',
      url: $url,
      success: function(data){
      $("#container").empty();
       $("#container").append(
         `<ul><li id='1'>Temperatura actual: ${data.main.temp}°C</li><li id='2'>Temperatura máxima: ${data["main"]["temp_max"]}°C</li><li id='3'>Temperatura mínima: ${data.main.temp_min}°C</li><li id='4'>Descripción de las condiciones actuales: ${data.weather[0].description}</li><li id='5'>Velocidad del viento: ${data["wind"]["speed"]} km/h</li></ul>`)
   console.log(data)
   $("#country").text(data.name+", "+data.sys.country)
   $("#flag").attr("src","https://www.countryflags.io/"+data.sys.country+"/shiny/64.png")
      }, error:  function(){
        $("#container").empty();
        $("#container").append("<p>Sorry not found</p>")}

    })
})
$("form").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    return false;
  }
});
$("input").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    var pais = $("#input").val();
    pais=encodeURI(pais)
    $url="http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es"
    $("#container").empty();
    $("#container").append("<div class='spinner-border'></div>")
      $.ajax({
        method: 'GET',
        url: $url,
        success: function(data){
        $("#container").empty();
         $("#container").append(
           `<ul><li id='1'>Temperatura actual: ${data.main.temp}°C</li><li id='2'>Temperatura máxima: ${data["main"]["temp_max"]}°C</li><li id='3'>Temperatura mínima: ${data.main.temp_min}°C</li><li id='4'>Descripción de las condiciones actuales: ${data.weather[0].description}</li><li id='5'>Velocidad del viento: ${data["wind"]["speed"]} km/h</li></ul>`)
     console.log(data)
     $("#country").text(data.name+", "+data.sys.country)
   $("#flag").attr("src","https://www.countryflags.io/"+data.sys.country+"/shiny/64.png")
        }, error:  function(){
          $("#container").empty();
          $("#container").append("<p>Sorry not found</p>")}
  
      })
  }
});