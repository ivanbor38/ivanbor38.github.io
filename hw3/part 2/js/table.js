/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {

        //Maintain reference to the tree Object;
        this.tree = treeObject;

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData.slice(); //

        ///** Store all match data for the 2014 Fifa cup */
        this.teamData =  teamData;
        //console.log(teamData);

        // ugly fix for sort function
        for (var i = 0; i < teamData.length; i++) {

            teamData[i]['value']['key'] = teamData[i]['key'];

            if (teamData[i]['value']['Result']['label'] == 'Round of Sixteen') {
                teamData[i]['value']['Result']['label'] = '1/8';
            }

        }
        //console.log(teamData);
        //Default values for the Table Headers
        this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

        /** To be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
        this.goalScale = null;

        /** Used for games/wins/losses*/
        this.gameScale = null;

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregateColorScale = null;

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalColorScale = null;


		this.tableData = d3.select('#matchTable > tbody');

		this.cnt = 0;
		this.header = null;

        this.strange_cnt = 0;
        this.strange_sort = 0;

        this.sort_enabled = false;
    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******

        //Update Scale Domains

        // Create the x axes for the goalScale.

        //add GoalAxis to header of col 1.

        var width = 130;
        var height = 20;
        var maxGoals = d3.max(this.teamData, d => d.value["Goals Made"]);

        this.goalScale = d3.scaleLinear()
			.domain([0, maxGoals])
			.range([0, width]);

        var xAxis = d3.axisTop()
			.tickValues(d3.range(0, maxGoals + 1, 2))
			.scale(this.goalScale);


        d3.select("#goalHeader")
            .append("svg")
            .attr("height", height + 5)
            .attr("width", width + 20)
            .append("g")
            .attr("transform", "translate(10, 20)")
            .attr("width", width)
            .attr("height", height)
            .call(xAxis)


        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers

        // Clicking on headers should also trigger collapseList() and updateTable().






	   d3.select('#Wins')
	   .on('click', d => {
           this.sort_enabled = true;
		   if (this.header == 0) {
			   this.cnt++;
		   }
		   else {
			   this.cnt = 0;
		   }
			this.header = 0;
			this.updateTable();

	   });
	   d3.select('#Losses')
	   .on('click', d => {
           this.sort_enabled = true;
		   if (this.header == 2) {
			   this.cnt++;
		   }
		   else {
			   this.cnt = 0;
		   }
			this.header = 2;
			this.updateTable();

	   });

	   d3.select('#Goals')
	   .on('click', d => {
           this.sort_enabled = true;
		   if (this.header == 3) {
			   this.cnt++;
		   }
		   else {
			   this.cnt = 0;
		   }
			this.header = 3;
			this.updateTable();

	   });






	   d3.select('#team')
	   .on('click', d => {
           this.sort_enabled = true;
		   if (this.header == 4) {
			   this.cnt++;
		   }
		   else {
			   this.cnt = 0;
		   }
			this.header = 4;
			this.updateTable();
	   });


	   d3.select('#TotalGames')
	   .on('click', d => {
           this.sort_enabled = true;
		   if (this.header == 1) {
			   this.cnt++;
		   }
		   else {
			   this.cnt = 0;
		   }
			this.header = 1;
			this.updateTable();



	   });


	   //console.log(this.header);
	   //console.log(this.cnt);

	   function sorting(hdr) {
			if (hdr == '') {
				return true;
			}


	   }











    }


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable(with_sort=true) {
        // ******* TODO: PART III *******
        //Create table rows

        //Append th elements for the Team Names

        //Append td elements for the remaining columns.
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}

        //Add scores as title property to appear on hover

        //Populate cells (do one type of cell at a time )

        //Create diagrams in the goals column

        //Set the color of all games that tied to light gray


        var width = 130;
        var height = 20;

		var maxWins = d3.max(this.teamData, d => d.value.Wins) + 1;
        var maxLosses = d3.max(this.teamData, d => d.value.Losses) + 1;
        var maxTotalGames = d3.max(this.teamData, d => d.value.TotalGames) + 1;

		var maxOverall = d3.max([maxWins, maxLosses, maxTotalGames]);


		//console.log(maxOverall);

		var rows = d3.select('#matchTable > tbody').selectAll("tr");

		rows.remove();





        var rows = rows
  				.data(this.tableElements, d => d)
  				.enter()
  				.append("tr")
                .on('click', (d) => {
                    if (this.sort_enabled) {
                        return true;
                    }

                    if (d.value.type == 'game') {
                        this.tree.updateTree(d);

                    }

                    if (d.value.type == 'aggregate') {

                        for (var i = 0; i < this.tableElements.length; i++) {
                            if (d.key === this.tableElements[i]['key']) {


                                this.updateList(i);
                                this.selected = d.key;
                                this.tree.updateTree(d)
                            }

                        }
                    }
                })
  				.attr('title', function(d) {


					if (d.value.TotalGames == 3) {

						var draws = d.value.TotalGames - d.value.Wins - d.value.Losses;
						var win_points = d.value.Wins * 3
						var total_score = draws + win_points;
						return "Total Score: " + total_score;
					}

					var points = 0;
					for (var i = 0; i < d.value.TotalGames; i++) {

						if (d.value.games[i]['value']['Result']['label'] == 'Group') {
							if (d.value.games[i]['value']["Goals Made"] - d.value.games[i]['value']["Goals Conceded"] > 0){
								points += 3;
							}
							else if (d.value.games[i]['value']["Goals Made"] - d.value.games[i]['value']["Goals Conceded"] == 0){
								points++;
							}
						}
					}

					return "Total Score: " + points;


				})


		if (this.header != null && with_sort) {
            this.strange_sort = 1;
			this.collapseList();

			var sort_arr = ["Wins", 'TotalGames', 'Losses', 'Goals Made', 'key']
			var tmp = sort_arr[this.header];
			//console.log(tmp);



			rows.sort((a, b) => {



				if (this.cnt % 2 == 0) {

					return d3.descending(a.value[tmp], b.value[tmp]);
				}
				else {
					return d3.ascending(a.value[tmp], b.value[tmp]);
				}

			})



            this.strange_sort = 0;

		}



		var cells = rows.selectAll('td')
            .data(row => [
                { type: row.value.type, value: [row.key], vis: 'team_name' },
                { type: row.value.type, value: [+row.value["Goals Made"], +row.value["Goals Conceded"]], vis: 'goals' },
                { type: row.value.type, value: [row.value.Result.label], vis: 'round_result' },
                { type: row.value.type, value: [row.value.Wins], vis: 'wins' },
                { type: row.value.type, value: [row.value.Losses], vis: 'losses' },
                { type: row.value.type, value: [row.value.TotalGames], vis: 'total_games' },
				]
			).enter()
            .append('td')
            .text(function(d) {

				if (d.vis == "team_name" || d.vis == "round_result") {
                    return d.value;
                }
				return '';
            })

            cells.attr("class", function(d) {

                if (d.type == "game") {
                    if (d.vis == "team_name") {
                        return "game";
                    }
                    return "";
                }
                else if (d.vis == "team_name") {
                    return "team_name";
                }
            });


			//console.log(cells);






		var colorScale = d3.scaleLinear()
            .domain([1, maxOverall])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb("#ECE2F0"), d3.rgb('#016450')]);


        var g = cells.filter(function(d) {
			return d.vis == 'wins' || d.vis == 'losses' || d.vis == 'total_games' || d.vis == 'goals';
			})
			.append("svg")
            .attr("width", function(d) {
				if (d.vis == 'wins' || d.vis == 'losses' || d.vis == 'total_games') {
					return 75;
				}
				if (d.vis == 'round_result') {
					return 170;
				}
				return 150;
			})
            .attr("height", height)
            .append("g");

        var bars = g.filter(d => d.vis != "goals");


		bars.append("rect")
            .attr("width", function(d){
				return 75 / (maxOverall - 1) * d.value[0];
				})
            .attr("height", height)
            .attr("fill", d => colorScale(d.value[0]));

		bars.append("text")
            .attr("x", function (d) {
				return 75 / (maxOverall - 1) * d.value[0] - 4;
				})
            .attr("y", 13)
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .text(d => d.value[0]);

		console.log(this.goalScale);
        g.filter(d => d.vis == "goals" && d.value[0] == d.value[1])
            .attr("class", d => d.type)
            .append("circle")
            .attr("class", "draw")
			//.attr('cy', 11)
			//.attr('r', 6)
			//.attr('fill', 'rgb(128,128,128)')
            .attr("cx", d => Math.round(this.goalScale(d.value[0] + 3)));

        var goalRanges = g.filter(d => d.vis == "goals" && d.value[0] != d.value[1])
            .attr("class", d => d.type);

        goalRanges.append("rect")
            .attr("class", function(d) {
				if (d.value[0] < d.value[1]) {
					return "negative";
				}
				return "positive";
			})
            .attr("width", d => {
                var max_min = d3.extent(d.value);
                return this.goalScale(max_min[1] - max_min[0]);
            })
            .attr("x", d => d.type == "game" ? Math.round(this.goalScale(d3.min(d.value))) + 2 : Math.round(this.goalScale(d3.min(d.value)) + 6))
			//.attr('height', 10)
			//.attr('y', 6);


        goalRanges.append("circle")
            .attr("class", function(d) {
				if (d3.max(d.value) == d.value[0]) {
					return "negative";
				}
				return "positive";
			})
            .attr('cx', d => Math.round(this.goalScale(d3.min(d.value)) + 6))
			//.attr('cy', 11)
			//.attr('r', 6);

        goalRanges.append("circle")
            .attr("class", function(d) {
				if (d3.max(d.value) == d.value[1]) {
					return "negative";
				}
				return "positive";
			})
            .attr('cx', d => d.type == 'game' ? Math.round(this.goalScale(d3.max(d.value))) + 3.5 : Math.round(this.goalScale(d3.max(d.value)) + 5))
			.attr('cy', 11)
			.attr('r', 6)


    };

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******

        //Only update list for aggregate clicks, not game clicks
        //console.log(i);
        //console.log(this.selected);
/*
        var sort_arr = ["Wins", 'TotalGames', 'Losses', 'Goals Made', 'key']
        var tmp = sort_arr[this.header];

        this.tableElements = this.tableElements.sort((a, b) => {



            if (this.cnt % 2 == 0) {

                return d3.descending(a.value[tmp], b.value[tmp]);
            }
            else {
                return d3.ascending(a.value[tmp], b.value[tmp]);
            }

        });

        //console.log(11);
        //console.log(this.tableElements);
*/

        var data = this.tableElements[i];
        //console.log(i);
        //console.log(data);
        //console.log(this.selected);
        if ((data.key == this.selected && this.strange_cnt == 0) || (this.strange_sort)) {

            this.updateTable();
            this.collapseList();
            this.strange_cnt = 1;
            return true;
        }
        this.strange_cnt = 0;
        var games = data.value.games.map(g => {
            return { key: 'x' + g.key, value: g.value, unique: g.key + "_" + data.key };
        })

        games.unshift(0);
        games.unshift(i + 1); // выталкивает бразилию из списка

        this.tableElements.splice.apply(this.tableElements, games);

        this.updateTable();
        this.collapseList();

	}

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {




        for (var i = 0; i < this.tableElements.length; i++) {
            var row = this.tableElements[i];

            if (row.value.type == 'game') {
                this.tableElements.splice(i, 1);
                i--;
            }
        }
    }


}
