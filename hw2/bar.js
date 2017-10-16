

  var cnt = 0;
  var curr_header = '';
  
  
  
      
d3.json("countries_1995_2012.json", function(error, data){
    
    tmp_data = [];
    
    color_map = {
        'Americas': '#990000',
        'Africa': 'black',
        'Asia': '#CCCC00',
        'Europe': '#1B4EDB',
        'Oceania': '#155B17'
    }
    
    for (i=0; i< data.length; i++) {
        for (j=0; j<data[i]['years'].length; j++) {
            obj = {
                'name': data[i]['name'],
                'continent': data[i]['continent'],
                'gdp': data[i]['years'][j]['gdp'],
                'life_expectancy': data[i]['years'][j]['life_expectancy'],
                'population': data[i]['years'][j]['population'],
                'year': data[i]['years'][j]['year'],
                'color': color_map[data[i]['continent']]
            }
            tmp_data.push(obj);
        }
    }
    
    data = tmp_data;
    
    
    
  
    var desired_cols = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year']
  
    var columns = desired_cols;
  
    var table = d3.select("body").append("table"),
          thead = table.append("thead").attr("class", "thead");
          tbody = table.append("tbody");

        table.append("caption").html("World Countries Ranking");
  
  
    
  
    //console.log(data[0]);
  
    d3.selectAll(".myCheckbox").on("change",update);
    d3.selectAll(".aggregation").on("change",update);
    d3.selectAll(".sort_by_key").on("change",update);
    d3.selectAll(".encoder").on("change",update);
    d3.select('.range').on("change", update);
    
    var agg = 'None';
    var sorting = 'name';
    var encode = 'population';
    
    
    function changeAgg() {
    
        d3.selectAll(".aggregation").each(function (d) {
            rb = d3.select(this);
            if (rb.property('checked')) {
                agg = rb.property("value");
                }
        });
    }
    
    
    
    
    function update(){
        
        d3.select('thead').remove();
        d3.select('tbody').remove();
        
        d3.selectAll('g').remove();
        d3.selectAll('svg').remove();
        
      
      
        thead = table.append("thead").attr("class", "thead");
      
        tbody = table.append("tbody");
        
        
        var choices = [];
        d3.selectAll(".myCheckbox").each(function(d){
          cb = d3.select(this);
          if(cb.property("checked")){
            choices.push(cb.property("value"));
              }
          });
      
    
        var curr_year = d3.select('.range').property('value');
        
        
        
        
        if (choices.length == 0) {
            choices = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];
        }
        
        newData = data.filter(function(d,i){
            return choices.includes(d['continent']) && d['year'] == curr_year;
            });
    
        
        //console.log(curr_year);
        
        
        
    
        changeAgg();
        //console.log(newData);
    
        if (agg == "by Continents") {
            newData = d3.nest()
                .key(function (d) { return d['continent']; })
                .rollup(function (rws) {
                    var aggTable = {
                        gdp: 0,
                        continent: rws[0]['continent'],
                        name: rws[0]['continent'],
                        life_expectancy: 0,
                        population: 0,
                        year: rws[0]['year']
                    };
                    
                    var numberOfCountries = 0;
                    rws.forEach(function (rw) {
                        numberOfCountries++;
                        
                        aggTable['gdp'] += rw['gdp'];
                        aggTable['life_expectancy'] += rw['life_expectancy'];
                        aggTable['population'] += rw['population'];
                        
                    });
                    
                    aggTable['life_expectancy'] /= numberOfCountries;
                    //console.log(aggTable);
                    return aggTable;
                }).entries(newData);

            
            newData = newData.map(function (dict) {return dict.value;});
            
            //console.log(newData);
        }    
    
        
        d3.selectAll(".encoder").each(function (d) {
            var rb = d3.select(this);
            if (rb.property('checked')) {
                encode = rb.property("value");
            }
        });
        
        d3.selectAll(".sort_by_key").each(function (d) {
            var rb = d3.select(this);
            if (rb.property('checked')) {
                sorting = rb.property("value");
            }
            });
        
        
        
    
    
    newData = newData.sort(function(a, b) {
        return d3.descending(a[sorting], b[sorting]);
    });
    
        
        
        
        var rows = tbody.selectAll("tr.row")
                .data(newData)
                .enter()
                .append("tr").attr("class", "row");
        
        
        //console.log(rows);
        
          var cells = rows.selectAll("td")
            .data(function(row) {
                //console.log(row);
                return d3.range(columns.length).map(function(column, i) {
                    if (column == 2) {
                        return d3.format(".3s")(row[columns[i]]);
                    }
                    if (column == 3) {
                        return d3.format(".1f")(row[columns[i]]);
                    }
                    if (column == 4) {
                        return d3.format(",")(row[columns[i]]);
                    }
                    
                    return row[columns[i]];
                });
            });
            cells.enter()
            .append("td")
            .text(function(d) { return d; });    
            
            cells.exit().remove();
            
         



 //------------------------------------------------------------------------------------------------------------------------       
        
        
            var margin = {top: 50, bottom: 10, left:300, right: 40};
            var width = 1200 - margin.left - margin.right;
            var height = newData.length * 21;
          
            var svg = d3.select("body").append("svg")
                        .attr("width", width+margin.left+margin.right)
                        .attr("height", height+margin.top+margin.bottom);
                
        
            
            
            
            
            
            
            
            
            var xScale = d3.scaleLinear().range([0, width]);
            var yScale = d3.scaleBand().rangeRound([0, height], .8, 0);


            var max = d3.max(newData, d => d[encode]);
            var min = 0;

            xScale.domain([min, max]);
            yScale.domain(newData.map(function (d) {
                return d.name;
            }));

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var groups = g.append("g")
                .selectAll("text")
                .data(newData)
                .enter()
                .append("g");

            groups.append("text")
                .text(d => d.name)
                .attr("x", xScale(min) - 10)
                .attr("y", function (d) {
                    return yScale(d.name) + 9;
                }).attr("dy", ".35em")
                .attr("text-anchor", "end");

            
            var div = d3.select("body").append("div").attr("class", "toolTip");
            
            
            
            
            function format_output(arr, feature) {
                    if (feature == 'gdp') {
                        return d3.format(".3s")(arr[feature]);
                    }
                    if (feature == 'life_expectancy') {
                        return d3.format(".1f")(arr[feature]);
                    }
                    if (feature == 'population') {
                        return d3.format(",")(arr[feature]);
                    }
                    
                    return arr[feature];
                };
            
            
            
            
            
            var bars = groups
                .append("rect")
                .attr("width", function (d) {
                    return xScale(d[encode]);
                })
                .attr("height", 18)
                .attr("x", xScale(min))
                .attr("y", function (d) {
                    return yScale(d.name);
                }).attr("fill", function(d){
                    if (agg == "by Continents") {
                        return color_map[d.name];
                    }
                    return d.color;
                }).on("mousemove", function(d){
                    div.style("left", d3.event.pageX+10+"px");
                    div.style("top", d3.event.pageY-25+"px");
                    div.style("display", "inline-block");
                    div.html("Year: " + curr_year + '<br>' +
                    "Continent: "+ (d.continent)+"<br>"+
                    "Bar encoded by " + encode + " value" + 
                    '<br>' + encode + ': ' + format_output(d, encode) + '<br>' +
                    "Sorted by: " + sorting
                    + '<br>' + sorting + ': ' + format_output(d, sorting));
                }).on("mouseout", function(d){
                div.style("display", "none");
            });
                    
                  
            
        
        
        
        
        
        
        



        /*

         
        thead.append("tr").selectAll("th")
        .data(columns).enter().append("th").text(function(d) { return d; }).on("click", function(header, i) {
        
        
        
        
            d3.select("img").remove();
        

        
            
        
            
            if (header == curr_header) {
                cnt++;
                
                if (cnt % 2 == 1) {
                    d3.select(this).append('img').attr('src', '002.png');
                    d3.select(this).style("cursor", "n-resize");
                    tbody.selectAll("tr").sort(function(a, b) {
                        if (header == 'continent') {
                            
                            return d3.ascending(a[header] + a['name'], b[header] + b['name']);
                        }
                        return d3.ascending(a[header], b[header]);
                    });
                    
                }
                else {
                    d3.select(this).append('img').attr('src', '001.png');               
                
                    tbody.selectAll("tr").sort(function(a, b) {
                        if (header == 'continent') {
                                return d3.descending(a[header] + a['name'], b[header] + b['name']);
                            }
                        
                      return d3.descending(a[header], b[header]); 
                        });
                }
            }
            
            else {
                
                d3.select(this).append('img').attr('src', '001.png');
                cnt = 0;
                curr_header = header;
                tbody.selectAll("tr").sort(function(a, b) {
                    if (header == 'continent') {
                                return d3.descending(a[header] + a['name'], b[header] + b['name']);
                            }
                      return d3.descending(a[header], b[header]);
                        });
            }
           
        });
        
        
        */
        d3.select('table').remove();
        
        
        
        
        //theader.exit().remove();
        }
  
    update();
  //-------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
  
  
  
    
    
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!










  
  //rows.exit().remove();

    //console.log(rows);
    
}
)



    