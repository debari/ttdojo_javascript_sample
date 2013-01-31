var latitude = 38.431645;
var longitude = 141.30943;
var PLACES_API = "https://maps.googleapis.com/maps/api/place/search/json";

var API_KEY = "";// 自分のAPI Keyを入れてください

$(function(){
    
    var loc = latitude + ',' + longitude;

// requestUrlを色々と変えてみましょう
    var requestUrl = PLACES_API + "?"
        +"key="+API_KEY + "&"
        +"location=" + loc + "&"
        +"radius="+"1000" + "&"
        +"sensor=false" + "&"
        +"language=ja" + "&"
        +"types=food";


    alert(requestUrl);


    var latlng = new google.maps.LatLng(latitude, longitude);
    var myOptions = {
        zoom: 16,
        disableDefaultUI:true,
        mapTypeControl:false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("gmap"),myOptions);
    var marker = new google.maps.Marker({
        position:latlng,
        map: map
    });

    $.getJSON(requestUrl,
              null,
              function(data,status){
                  for(var i in data.results){
                      
                      result = data.results[i];
                      k = Number(i)+1;

                      var iconUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld='+k+'|00CCFF|000000';
                      var marker = new google.maps.Marker({
                          position: new google.maps.LatLng(result.geometry.location.lat,result.geometry.location.lng),
                          title:result.name,
                          icon: iconUrl,
                          map: map
                      });

                      var content = "<div style=\"float:left;width:800px;margin:1px\">"
                          +"<img align='left' src='"+result.icon+"' height=75>"
                          +"<b>"+k+'. '+result.name+"</b><br>"+result.vicinity+"</div>"
                          +"<div style=\"clear:both\">";
                     
                      $("div#information").append(content);

                  }
              }
       
             );

});
