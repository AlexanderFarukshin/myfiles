$('document').ready(function(){

    $('#get-coordinates').click(function(){

        var query = $('#query').val();

        if(query!=""){
            
            $.get(

                'http://nominatim.openstreetmap.org/search/',

                {
                    format: 'json',
                    q:query, 
                    limit: 1
                },

                function(result)
                {
                    $('.result-coordinates').empty().append("<p style=\"margin-top: 20px;\">Широта: " + result[0].lat + ". Долгота: " + result[0].lon + "</p>");
                }
            );

        }
        else{
            alert("Строка запроса не должна быть пустой!");
        }

    });

    $('#get-address').click(function(){

        var lat = $('#lat').val();
        var lon = $('#lon').val();

        if(lat!="" && lon!=""){
            
            $.get(

                'http://nominatim.openstreetmap.org/reverse/',

                {
                    format: 'json',
                    lat:lat, 
                    lon:lon,
                    zoom: 18
                },

                function(result)
                {    
                    $('.result-address').empty().append("<p style=\"margin-top: 20px;\">Адрес: " + result.display_name + "</p>");
                }
            );

        }
        else{
            alert("Поля для координат не должны быть пустыми!");
        }

    });

});