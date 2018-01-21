(function () {
  groups = {

    // Lazily construct the package hierarchy from class names.
    root: function (classes) {
      var root = { key: "", children: classes };
      return root;
    },


    root2: function (groupsSet) {

      var nodes = groupsSet.map(group => {
        var node = {
          ...group,
          children: groupsSet
            .filter(relGroup => group.relations.indexOf(relGroup.key) > 0)
        };

        node.children.forEach((child) => { child.parent = node });

        return node;

      });

      return nodes;
    },

    relations: function (nodes) {
      var map = {},
        relations = [];

      nodes.forEach(function (d) {
        map[d.key] = d;
      });


      nodes.forEach(function (d) {
        if ( d.relations && d.relations.length)
          d.relations.forEach(function (i) {
            if (map[d.key] && map[i])
              relations.push({ source: map[d.key], target: map[i] });
          });
      });

      return relations;
    }

  };
})();
