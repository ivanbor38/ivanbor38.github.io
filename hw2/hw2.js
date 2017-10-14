

  var cnt = 0;
  var curr_header = '';
  
  
  
      
d3.json("countries_2012.json", function(error, data){
  
    var desired_cols = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year']
  
    var columns = desired_cols;
  
    var table = d3.select("body").append("table"),
          thead = table.append("thead")
                       .attr("class", "thead");
          tbody = table.append("tbody");

        table.append("caption")
          .html("World Countries Ranking");
  
  
  
  
  d3.selectAll(".myCheckbox").on("change",update);
    
    
    
    
    
    function update(){
        
      d3.select('thead').remove();
      d3.select('tbody').remove();
      
      
        thead = table.append("thead")
                       .attr("class", "thead");
      
        tbody = table.append("tbody");
        
        
      var choices = [];
      d3.selectAll(".myCheckbox").each(function(d){
        cb = d3.select(this);
        if(cb.property("checked")){
          choices.push(cb.property("value"));
        }
      });
      
    
    
    if (choices.length == 0) {
        choices = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];
    }
    newData = data.filter(function(d,i){return choices.includes(d['continent']);});
    

    var rows = tbody.selectAll("tr.row")
    .data(newData);
    
    
    rows.enter()
    .append("tr").attr("class", "row");
    rows.exit().remove();
    
    
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
        
        //theader.exit().remove();
        }
  
    update();
  //-------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
  
  
  
    
    
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!










  
  //rows.exit().remove();

    //console.log(rows);
    
}
)



    