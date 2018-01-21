var fs = require('fs');
var _ = require('lodash');

var json = fs.readFileSync('data/data_groups.json');
var data = JSON.parse(json);



let resultset = {};

_.forIn(data, (users, key) => {
    let group_relations;

    resultset[key] = [];

    _.forIn(data, (users2, keyOfRelated) => {
        if (key == keyOfRelated)
            return;

        if (_.intersection(users, users2).length > 0) {
            resultset[key].push(keyOfRelated);
        }
    })
});

fs.writeFile('data/group_relations_data.json', JSON.stringify(resultset));