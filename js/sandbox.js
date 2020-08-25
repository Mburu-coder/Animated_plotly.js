Plotly.d3.csv('/Kenya.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var countryName = unpack(rows, 'name'),
        countryArea = unpack(rows, 'area'),
        countryLat = unpack(rows, 'lat'), //Use coordinates of capital cities
        countryLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        countrySize = [],
        hoverText = [],
        scale = 10000;

    for ( var i = 0 ; i < countryArea.length; i++) {
        var currentSize = countryArea[i] / scale;
        var currentText = "Country: " + countryName[i] + "<br> Forest Area: " + countryArea[i];
        countrySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
        type: 'scattergeo',
        locationmode: 'country names',
        lat: countryLat,
        lon: countryLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: countrySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2016 Africa Forest Coverage in km squared',
        showlegend: false,
        geo: {
            scope: 'africa',
            
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
        width: 800,
        height: 700,
    };

    Plotly.newPlot("myDiv", data, layout, {showLink: false});

});



