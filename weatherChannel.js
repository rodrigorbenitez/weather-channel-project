//-----------------------init function checking IP adress and dislpay-----------------//
$.ajax({
  method: 'GET',
  url: 'http://api.ipstack.com/check?access_key=3bbfe95ac22f81c7dc94c445060d239d',
  success: function(data){
   $("#country").prepend("<div id='header'><h4 id='country'>"+data.city+", "+data.country_name+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.country_code+"/shiny/32.png'></div>")
   console.log(data)
   pais=data.city
   $.ajax({
    method: 'GET',
    url: "http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es",
    success: function(data){
     $("#tact").prepend(parseInt(data.main.temp, 10))
     $("#tmax").append(parseInt(data.main.temp_max,10)+" °C")
     $("#tmin").append(parseInt(data.main.temp_min,10)+" °C")
     suffix=data.weather[0].icon
     classicon="owf owf-"+data.weather[0].id+"-"+suffix[2]+" owf-5x"
     $("i").addClass(classicon);
     description=data.weather[0].description;
     $("#description").text(description[0].toUpperCase()+description.slice(1));
 console.log(data)
    }, error:  function(){
      $("#container").append("<p>Sorry not found</p>")}
 })}})
 //--------click button function-------------//
$("#search").on("click",function() {
  var pais = $("#input").val();
  pais=encodeURI(pais)
  $url="http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es"
  $("#tact").text("")
     $("#tmax").text("")
     $("#tmin").text("")
  $("#spinner").append("<div class='spinner-border'></div>")
    $.ajax({
      method: 'GET',
      url: $url,
      success: function(data){
        $("#spinner").empty()
        $("#tact").prepend(parseInt(data.main.temp, 10))
        $("#tmax").append(parseInt(data.main.temp_max,10)+" °C")
        $("#tmin").append(parseInt(data.main.temp_min,10)+" °C")
        $('#wicon').attr('src', "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
        console.log(data)
       $("#country").html("<div id='header'><h4 id='country'>"+data.name+", "+data.sys.country+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.sys.country+"/shiny/32.png'></div>")
       suffix=data.weather[0].icon
       classicon="owf owf-"+data.weather[0].id+"-"+suffix[2]+" owf-5x"
       $("i").remove();
       $("#icon").html("<i class='"+classicon+"'></i>");
       description=data.weather[0].description;
       $("#description").text(description[0].toUpperCase()+description.slice(1));
    }, error:  function(){
        $("#container").append("<p>Sorry not found</p>")}

    })
})
//----------------------enter key press function--------------------//
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
    $("#tact").text("")
    $("#tmax").text("")
    $("#tmin").text("")
    $("#spinner").append("<div class='spinner-border'></div>")
      $.ajax({
        method: 'GET',
        url: $url,
        success: function(data){
          $("#spinner").empty()
          $("#tact").prepend(parseInt(data.main.temp, 10))
          $("#tmax").append(parseInt(data.main.temp_max,10)+" °C")
          $("#tmin").append(parseInt(data.main.temp_min,10)+" °C")
          $('#wicon').attr('src', "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
     console.log(data)
     $("#country").html("<div id='header'><h4 id='country'>"+data.name+", "+data.sys.country+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.sys.country+"/shiny/32.png'></div>")
          suffix=data.weather[0].icon
          classicon="owf owf-"+data.weather[0].id+"-"+suffix[2]+" owf-5x"
          $("i").remove();
          $("#icon").html("<i class='"+classicon+"'></i>");
          description=data.weather[0].description;
         $("#description").text(description[0].toUpperCase()+description.slice(1));
    }, error:  function(){
        
          $("#container").append("<p>Sorry not found</p>")}
  
      })
  }
});