function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var filterState = {
    dt_create: [2011, 2017]
}

var loadData = new Promise((resolve, reject) => {
    d3.csv("data/group_connections_weight.csv", function (error1, groups_users_relations) {


        d3.csv("data/top400_info.csv", function (error2, groups_data) {
            d3.json("data/group_relations.json", function (error3, groups_relations) {

                var a = groups_users_relations;
                var resultDataSet = groups_data.map((group) => {

                    group.key = group._id;
                    var relInfo = groups_relations.find(rel => rel.key == group._id);

                    group.usersCount = 0;
                    group.dt_create = +group.dt_create;

                    groups_users_relations.filter(item => item.id == group.key)
                        .forEach((elem) => group.usersCount += (+elem["common bank users"]));


                    return { ...group, relations: relInfo.relations };
                })

                resultDataSet.forEach(groupData => {
                    groupData.similarGroups = resultDataSet
                        .filter((group) => { return (group.usersCount - (groupData.usersCount * 0.05)) <= group.usersCount && group.usersCount <= (groupData.usersCount + (groupData.usersCount * 0.05)) && group.key != groupData.key })
                        .sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) });
                })

                resultDataSet = resultDataSet
                    .sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) })
                  //  .filter((em, id) => id < 10);

                resolve(resultDataSet);

            });
        });
    });
});



function createTable(mountSelection, data, titles) {

    var sortAscending = true;

    var headder = mountSelection.append('span')
        .attr('class', "table-header")
        .text("TOP 10 - Most popular groups");

    var table = mountSelection.append('table');

    var headers = table.append('thead').append('tr')
        .selectAll('th')
        .data(titles).enter()
        .append('th')
        .text(function (d) {
            return d.title;
        })
        .on('click', function (d) {
            headers.attr('class', 'header');

            if (sortAscending) {
                rows.sort((a, b) => {
                    return d3.ascending(a[d.idx], b[d.idx]);
                });
                sortAscending = false;
                this.className = 'aes';
            } else {
                rows.sort((a, b) => {
                    return d3.descending(a[d.idx], b[d.idx]);
                });

                sortAscending = true;
                this.className = 'des';
            }

        });


    var rows = table.append('tbody').selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
    rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (cd) {
                return { 'value': d[cd.idx], 'name': cd.title };
            });
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
            return d.idx;
        })
        .text(function (d) {
            return d.value;
        });

    rows.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) });
}

function updateTable(data, titles) {

    var table = d3.select("tbody")

    table.selectAll('tr')
        .data(data, d => d.key)
        .exit()
        .remove();

    var rows = table.selectAll('tr')
        .data(data, d => d.key)
        .enter()
        .append('tr');


    rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (cd) {
                return { 'value': d[cd.idx], 'name': cd.title };
            }, d => d.value);
        }).exit()
        .remove();

    rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (cd) {
                return { 'value': d[cd.idx], 'name': cd.title };
            }, d => d.value);
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
            return d.idx;
        })
        .text(function (d) {
            return d.value;
        });

    table.selectAll('tr').sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) });

    var sortAscending = false;

    var headers = d3.select("thead").select("tr").selectAll("th")
        .on('click', function (d) {
            headers.attr('class', 'header');

            if (sortAscending) {
                table.selectAll('tr').sort((a, b) => {
                    return d3.ascending(a[d.idx], b[d.idx]);
                });
                sortAscending = false;
                this.className = 'aes';
            } else {
                table.selectAll('tr').sort((a, b) => {
                    return d3.descending(a[d.idx], b[d.idx]);
                });

                sortAscending = true;
                this.className = 'des';
            }

        });



}


function updateSimilarData(data, group_id) {
    var selection = similarList
        .selectAll('li')
        .data(data, d => d.key);

    selection.exit().remove();

    selection.enter()
        .append('li')
        .append("a")
        .attr("href", d => d.link)
        .text(d => d._id + group_id)


}



var w = 1180,
    h = 800,
    rx = w / 2,
    ry = h / 2,
    m0,
    rotate = 0;

var splines = [];

var cluster = d3.layout.cluster()
    .size([360, ry - 120])
    .sort(function (a, b) { return d3.ascending(a.key, b.key); });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.70)
    .radius(function (d) { return d.y; })
    .angle(function (d) { return d.x / 180 * Math.PI; });


var div = d3.select("body").insert("div", "h2")
    // .style("top", "-80px")
    // .style("left", "-160px")
    .style("width", w + "px")
    .style("height", w + "px")
    .style('display', "inline-block")

    // .style("position", "absolute")
    .style("-webkit-backface-visibility", "hidden");

var svg = div.append("svg:svg")
    .attr("width", w)
    .attr("height", w)
    .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);


///
var groupInfoContainer = d3.select("body").append("div")
    .attr("class", "sidebar")
    .style("display", "inline-block")
    .style("vertical-align", "top")
    .style("font-size", "16px")
    .style("padding", "30px")
    .style("height", "100%");

var filters = groupInfoContainer.append("div")
    .style("padding", "30px")
    .style("margin", "0 0 70px 0");

var filterStateIndicator = filters.append("span")
    .text("Time period: " + (+filterState.dt_create[0]) + "-" + (+filterState.dt_create[1]))
    .attr('id', "year-filter-state")
    .style("font-size", "18px")

var corobox = filters.append("div");


corobox.append("span")
    .style("display", "inline-block")
    .text("2011");



var dateSlider = corobox.append("div")
    .style("width", "300px")
    .style("display", "inline-block")
    .style("margin-top", "15px")
    .style("transform", "scale(0.6)")
    .attr('id', "year-filter");

var sliderComponent = noUiSlider.create(document.getElementById('year-filter'), {
    start: [2011, 2017],

    connect: true,
    step: 1,
    behaviour: 'drag',
    range: {
        'min': 2011,
        'max': 2017
    }
});

corobox.append("span")
    .style("display", "inline-block")
    .text("2017");





var singleCardInfo = groupInfoContainer
    .append("div")
    .style("height", "250px")
    .style("visibility", "hidden")
    .style("margin", "0 0 70px 0");

singleCardInfo.append("img")
    .style("display", "inline-block")
    .attr("id", "group-info-photo");

var containerSider = singleCardInfo.append("div")
    .style("margin-left", "25px")
    .style("vertical-align", "top")
    .style("display", "inline-block");

containerSider.append('span').append('a')
    .attr("id", "group-info-name")
    .style("display", "block")
    .text("Group name: ");

containerSider.append('span')
    .style("display", "block")
    .attr("id", "group-info-users-count")
    .text("Amount of followers: ");

var listOfSimilarDiv = containerSider.append("div");

listOfSimilarDiv.append("span")
    .text("Similar groups:");

var similarList = listOfSimilarDiv.attr("class", "simlinks")
    .append("ul");
	
	


loadData.then((data) => {

    var rowsData = data.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) })
        .filter(el => filterState.dt_create[0] <= el["dt_create"] && el["dt_create"] <= filterState.dt_create[1]);
	

    drawGraph(rowsData.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) }));

    var titles = [
        { idx: "name", title: "Group name" },
        { idx: "usersCount", title: "Amount of followers" },
        { idx: "dt_create", title: "Year of the 1st post" },
    ];


    sliderComponent.on('end', function () {
        var values = sliderComponent.get();

        filterState.dt_create[0] = Math.ceil(+values[0]);
        filterState.dt_create[1] = Math.ceil(+values[1]);

        var filteredData = data.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) })
            .filter(el => filterState.dt_create[0] <= el["dt_create"] && el["dt_create"] <= filterState.dt_create[1]);


        d3.select("#year-filter-state")
            .text("Time period: " + filterState.dt_create[0] + "-" + filterState.dt_create[1]);

        drawGraph(filteredData);
        updateTable(filteredData.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) }).filter((el, i) => i < 10), titles);
    })

    createTable(
        groupInfoContainer,
        rowsData.sort((a, b) => { return d3.descending(a.usersCount, b.usersCount) }).filter((el, i) => i < 10),
        titles,
    );


});

function drawGraph(data) {

    var nodes = cluster.nodes(groups.root(data)),
        links = groups.relations(nodes),
        splines = bundle(links);


    svg.selectAll("path.link")
        .data(links, d => d.source.key + ":" + d.target.key)
        .exit()
        .remove();

    var path = svg.selectAll("path.link")
        .data(links, d => d.source.key + ":" + d.target.key)
        .enter().append("svg:path")
        .attr("class", function (d) { return "link source-" + d.source.key + " target-" + d.target.key; })
        .attr("d", function (d, i) { return line(splines[i]); });

    svg.selectAll("g.node")
        .data(nodes.filter(function (n) { return !n.children; }))
        .exit()
        .remove();

    svg.selectAll("g.node")
        .remove();

    svg.selectAll("g.node")
        .data(nodes.filter(function (n) { return !n.children; }), d => d.key)
        .enter().append("svg:g")
        .attr("class", "node")
        .attr("id", function (d) { return "node-" + d.key; })
        .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("svg:text")
        .attr("dx", function (d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function (d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function (d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function (d) { return d.name; })
        //.on("mouseover", mouseover)
        //.on("mouseout", mouseout)
        .on("click", labelClick);


}


d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

function mouse(e) {
    return [e.pageX - rx, e.pageY - ry];
}

function mousedown() {
    m0 = mouse(d3.event);
    d3.event.preventDefault();
}

function mousemove() {
    if (m0) {
        var m1 = mouse(d3.event),
            dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
        div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
    }
}

function mouseup() {
    if (m0) {
        var m1 = mouse(d3.event),
            dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

        rotate += dm;
        if (rotate > 360) rotate -= 360;
        else if (rotate < 0) rotate += 360;
        m0 = null;

        div.style("-webkit-transform", null);

        svg
            .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
            .selectAll("g.node text")
            .attr("dx", function (d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
            .attr("text-anchor", function (d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
            .attr("transform", function (d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
    }
}

var prevSelected = {};

function labelClick(d) {

    svg.selectAll("path.link.source-" + prevSelected.key)
        .classed("source", false)
        .each(updateNodes("target", false));

    svg.selectAll("path.link.target-" + prevSelected.key)
        .classed("target", false)
        .each(updateNodes("source", false));

    svg.selectAll("path.link.target-" + d.key)
        .classed("target", true)
        .each(updateNodes("source", true));

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", true)
        .each(updateNodes("target", true));


    singleCardInfo.style("visibility", "visible");

    d3.select('#group-info-photo')
        .attr('src', d.photo_200);

    d3.select('#group-info-name')
        .attr('href', d.link)
        .text('Group name: ' + d.name);
    d3.select('#group-info-users-count')
        .text('Amount of followers: ' + d.usersCount || "");

    updateSimilarData(d.similarGroups.filter((el, i) => i < 10), d._id);

    prevSelected = d;

}

function mouseover(d) {
    svg.selectAll("path.link.target-" + d.key)
        .classed("target", true)
        .each(updateNodes("source", true));

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", true)
        .each(updateNodes("target", true));
}

function mouseout(d) {
    svg.selectAll("path.link.source-" + d.key)
        .classed("source", false)
        .each(updateNodes("target", false));

    svg.selectAll("path.link.target-" + d.key)
        .classed("target", false)
        .each(updateNodes("source", false));
}

function updateNodes(name, value) {
    return function (d) {
        if (value) this.parentNode.appendChild(this);
        svg.select("#node-" + d[name].key).classed(name, value);
    };
}

function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}