/** Class implementing the tree view. */
class Tree {
    /**
     * Creates a Tree Object
     */
    constructor() {
        this.treeLayout = null;
        this.svg = d3.select('#tree')
            .attr("transform", 'translate(90, 0)');
        this.data = null;
    }

    /**
     * Creates a node/edge structure and renders a tree layout based on the input data
     *
     * @param treeData an array of objects that contain parent/child information.
     */
    createTree(treeData) {

        // ******* TODO: PART VI *******

        //Create a tree and give it a size() of 800 by 300.
        this.treeLayout = d3.tree()
            .size([800, 300]);
        //Create a root for the tree using d3.stratify();
        this.data = d3.stratify()
            .id(function (d, i) { return i; })
            .parentId(d => d.ParentGame)
            (treeData);




        var nodes = d3.hierarchy(this.data, function (d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = this.treeLayout(nodes);


        //Add nodes and links to the tree.
        var link = this.svg.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // adds each node as a group
        var node = this.svg.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => {
                if (d.parent) {
                    if (d.parent.data.data.Team == d.data.data.Team) {
                        return 'winner';
                    }
                    else{
                        return 'loser node';
                    }
                } else {
                    return 'winner';
                }
            })
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // adds the circle to the node
        node.append("circle")
            .attr("r", 6);

        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("x", function (d) { return d.children ? -13 : 13; })
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) { return d.data.data.Team; });

        this.nodeSelection = node;
        this.linkSelection = link;
    };

    /**
     * Updates the highlighting in the tree based on the selected team.
     * Highlights the appropriate team nodes and labels.
     *
     * @param row a string specifying which team was selected in the table.
     */
    updateTree(row) {
        // ******* TODO: PART VII *******
        this.clearTree();
        this.nodeSelection.filter(d=>{
            //Дописать реализацию для выделения матчей 1/8 чм.
            if (row.value.Result.label != 'Group' && row.value.type == 'game'){
                var oponents = row.unique.split('-');

                return d.data.data && ( d.data.data.Team == oponents[0] && d.data.data.Opponent == oponents[1] || d.data.data.Team == oponents[1] && d.data.data.Opponent == oponents[0]);
            }
            return d.parent && d.parent.data.data.Team == row.key && d.data.data.Team == d.parent.data.data.Team || d.data.data.Team == row.key;
        }).classed('selectedLabel', true);
        this.linkSelection.filter(d=>{
           //Дописать реализацию для выделения матчей 1/8 чм.
            if (row.value.Result.label != 'Group' && row.value.type == 'game'){
                let oponents = row.unique.split('-');

                return d.data.data && ( d.data.data.Team == oponents[0] && d.data.data.Opponent == oponents[1] || d.data.data.Team == oponents[1] && d.data.data.Opponent == oponents[0]);
            }

            return d.parent.data.data.Team == d.data.data.Team && row.key == d.data.data.Team ;
        }).classed('selected', true);

    }

    /**
     * Removes all highlighting from the tree.
     */
    clearTree() {
        // ******* TODO: PART VII *******
        this.nodeSelection.classed('selectedLabel', false);
        this.linkSelection.classed('selected', false);

        // You only need two lines of code for this! No loops!
    }
}
