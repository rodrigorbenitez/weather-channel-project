//-----------------------init function checking IP adress and dislpay-----------------//
$.ajax({
  method: 'GET',
  url: 'http://api.ipstack.com/check?access_key=3bbfe95ac22f81c7dc94c445060d239d',
  success: function(data){
   $("#country").prepend("<div id='header'><h4 id='country'>"+data.city+", "+data.country_name+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.country_code+"/shiny/32.png'></div>")
   console.log(data)
   pais=data.city
   $url="http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es"
   ajaxRequest()
}})
 //--------click button function-------------//
$("#search").on("click",function() {
  var pais = $("#input").val();
  pais=encodeURI(pais)
  $url="http://api.openweathermap.org/data/2.5/weather?q="+pais+"&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es"
     restartDisplay()
     ajaxRequest()
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
    restartDisplay()
      ajaxRequest()
  }
});

//---------------------functions---------------------------//

//----empty display, spinner excecute, and click disable until the ajax request is complete------//
function restartDisplay(){
     $("#spinner").empty()
     $("#icon").empty()
     $("#country").empty()
     $("#description").empty()
     $("#tact").text("")
     $("#tmax").text("")
     $("#tmin").text("")
     $("#tempSimbol").text("")
     $("#spinner").append("<div class='spinner-border'></div>")
     $("#search").prop("disabled",true);
}
//-------the Ajax request----------------//
function ajaxRequest(){
  $.ajax({
    method: 'GET',
    url: $url,
    success: function(data){
      $("#spinner").empty()
      $("#tact").prepend(parseInt(data.main.temp, 10))
      $("#tmax").append(parseInt(data.main.temp_max,10)+" °C")
      $("#tmin").append(parseInt(data.main.temp_min,10)+" °C")
      $("#tempSimbol").text("°C")
      $('#wicon').attr('src', "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
      console.log(data)
      $("#country").html("<div id='header'><h4 id='country'>"+data.name+", "+data.sys.country+" </h4><img id='flag' style='margin-left: 10px;' src='https://www.countryflags.io/"+data.sys.country+"/shiny/32.png'></div>")
      suffix=data.weather[0].icon
      classicon="owf owf-"+data.weather[0].id+"-"+suffix[2]+" owf-5x"
      $("i").remove();
      $("#icon").html("<i class='"+classicon+"'></i>");
      description=data.weather[0].description;
     $("#description").text(description[0].toUpperCase()+description.slice(1));
     $("#search").prop("disabled",false);
}, error:  function(){
      $("#spinner").empty()
      $("#search").prop("disabled",false);
      $("#spinner").text("Sorry not found")}

  })
}