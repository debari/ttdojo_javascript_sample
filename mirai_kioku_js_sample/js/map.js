var latitude = 38.431645;
var longitude = 141.30943;
var MIRAI_API = "http://www.miraikioku.com/api/search/kioku";

$(function(){
    var loc = latitude + ',' + longitude;

// requestUrlを色々と変えてみましょう
    var requestUrl = MIRAI_API + "?"
        +"location=" + loc + "&"
        +"location-radius="+"1" + "&"
        +"sort="+"dist"+"&"
        +"max-results="+"10";

    requestUrl +="&callback=?";//おまじない


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
                      latlng = result.location.split(",");
                      var iconUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld='+k+'|00CCFF|000000';
                      var marker = new google.maps.Marker({
                          position: new google.maps.LatLng(latlng[0],latlng[1]),
                          title:result.title,
                          icon: iconUrl,
                          map: map
                      });

                      var content = "<div style=\"float:left;width:800px;margin:1px\">"
                          +"<img align='left' src='"+result['thumb-url']+"' height=75>"
                          +"<a href=\""+result.url+"\">"
                          +"<b>"+k+'. '+result.title+"</b></a><br>"+result.desc+"</div>"
                          +"<div style=\"clear:both\">";
                     
                      $("div#information").append(content);

                  }
              }
       
             );

});
