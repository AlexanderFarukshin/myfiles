$('document').ready(function(){

  var FORWARD_GEO_ADDRESS = 'http://nominatim.openstreetmap.org/search/';
  var REVERSE_GEO_ADDRESS = 'http://nominatim.openstreetmap.org/reverse/';
  var RESPONSE_LIMIT = 1;
  var RESPONSE_FORMAT = 'json';
  var RESPONSE_ZOOM = 18;
  
  function transform_adress(address){
	  	
    var parts_of_address = address.split(', ');	
	  var new_address = '';
	
	  parts_of_address.forEach(function(item, i){
		
	    if( i == 0){
		  
		    new_address = item + new_address; 
		  
	    }else{
		  
		    new_address = item + ', ' + new_address;   
		
	    }		
		
	  });	
	  
    return new_address;
	  
  }

  $('#get-coordinates').click(function(){

    var query = $('#query').val();

    if(query != ""){

      $.get(

        FORWARD_GEO_ADDRESS,   
		
        {
			
          format: RESPONSE_FORMAT,
          q: transform_adress(query), 
          limit: RESPONSE_LIMIT
		  
        },
		
        function(result){
    
	        try{
			  
            $('.result-coordinates').empty().append("<p style=\"margin-top: 20px;\">Широта: " + result[0].lat + " Долгота: " + result[0].lon + "</p>");
     
	        }catch(e){
			  
            $('.result-coordinates').empty().append("<p style=\"margin-top: 20px;\">Произошла ошибка!</p>");
          
		      }	
		  
        }	
		
      );
	  
    }else{
		
      alert("Строка запроса не должна быть пустой!");
      
    }

  });

  $('#get-address').click(function(){

    var lat = $('#lat').val();
    var lon = $('#lon').val();

    if(lat != "" && lon != ""){

      $.get(

        REVERSE_GEO_ADDRESS,

        {
			
          format: RESPONSE_FORMAT,
          lat: lat, 
          lon: lon,
          zoom: RESPONSE_ZOOM
		  
        },

        function(result){    

          try{
			  
            $('.result-address').empty().append("<p style=\"margin-top: 20px;\">" + transform_adress(result.display_name) + "</p>");
			
          }catch(e){
			  
            $('.result-address').empty().append("<p style=\"margin-top: 20px;\">Произошла ошибка!</p>");

          }
		  
        }
		
      );

    }else{
		
      alert("Поля для координат не должны быть пустыми!");
 
    }
	
  });

});
