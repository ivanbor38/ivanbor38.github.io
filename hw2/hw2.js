

  var cnt = 0;
  var curr_header = '';
  
  
  
      
d3.json("countries_2012.json", function(error, data){
  var desired_cols = ['name', 'continent', 'gdp', 'life_expectancy', 'population', 'year']
  //var columns = Object.keys(data[0]);
  var columns = desired_cols;
  var table = d3.select("body").append("table"),
    thead = table.append("thead")
                 .attr("class", "thead");
    tbody = table.append("tbody");

  table.append("caption")
    .html("World Countries Ranking");

  thead.append("tr").selectAll("th")
    .data(columns)
  .enter()
    .append("th")
    .text(function(d) { return d; })
    .on("click", function(header, i) {
        
        
        
        
        var element = document.getElementsByTagName("img"), index;

        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        
        
       var pics = [{src:"001.png"}];

    thead.selectAll('th')
        //.filter(function(d, i) { return d == header; })
        .data(pics)
        .append('img')
        .attr('src', function(d) {
            return d.src;
        });
        
        
        
        
        if (header == curr_header) {
            cnt++;
            
            if (cnt % 2 == 1) {
                tbody.selectAll("tr").sort(function(a, b) {
                    if (header == 'continent') {
                        return d3.ascending(a[header] + a['name'], b[header] + b['name']);
                    }
                    return d3.ascending(a[header], b[header]);
                });
                return;
            }
            
            tbody.selectAll("tr").sort(function(a, b) {
                if (header == 'continent') {
                        return d3.descending(a[header] + a['name'], b[header] + b['name']);
                    }
                
              return d3.descending(a[header], b[header]); 
                });
            return;
        }
        
        
        cnt = 0;
        curr_header = header;
        return tbody.selectAll("tr").sort(function(a, b) {
            if (header == 'continent') {
                        return d3.descending(a[header] + a['name'], b[header] + b['name']);
                    }
              return d3.descending(a[header], b[header]);
                });
       
    });
    
    

  var rows = tbody.selectAll("tr.row")
    .data(data)
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
    })
    .enter()
    .append("td")
    .text(function(d) { return d; });
    
    
    
    
    

}
)