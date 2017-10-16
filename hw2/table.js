

  var cnt = 0;
  var curr_header = '';
  
  
  
      
d3.json("countries_1995_2012.json", function(error, data){
    
    tmp_data = [];
    
    for (i=0; i< data.length; i++) {
        for (j=0; j<data[i]['years'].length; j++) {
            obj = {
                'name': data[i]['name'],
                'continent': data[i]['continent'],
                'gdp': data[i]['years'][j]['gdp'],
                'life_expectancy': data[i]['years'][j]['life_expectancy'],
                'population': data[i]['years'][j]['population'],
                'year': data[i]['years'][j]['year']
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
  
  

  
    d3.selectAll(".myCheckbox").on("change",update);
    d3.selectAll(".aggregation").on("change",update);
    d3.select('.range').on("change", update);
    var agg = 'None';
    
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
            return choices.includes(d['continent']) && d['year'] == curr_year;});
    
            
        changeAgg();
      
    
        if (agg == "by Countries") {
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
                    
                    return aggTable;
                }).entries(newData);

            
            newData = newData.map(function (dict) {return dict.value;});
            
            
        }    
    
    
        
        
        var rows = tbody.selectAll("tr.row")
                .data(newData)
                .enter()
                .append("tr").attr("class", "row");
        
        
        
        
          var cells = rows.selectAll("td")
            .data(function(row) {
                
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
            
            
        thead.append("tr").selectAll("th")
        .data(columns).enter().append("th").text(function(d) { return d; }).on("click", function(header, i) {
        
        if (header == 'year') {
            return true;
        }
        
        
        d3.select("img").remove();
            
        
            
            if (header == curr_header) {
                if (header == 'year') {
                    return;
                }
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
        
        
        
        
        
        
        
        
        
        }
  
    update();

}
)



    