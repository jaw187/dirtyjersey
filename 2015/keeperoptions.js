var DraftResults = require('./data/2014draftresults.json');
var Drops = require('./data/2014drops.json');
var FinalRosters = require('./data/2014finalrosters.json');


var internals = {};


internals.main = function () {

    var prepareContracts = function (draftResults, drops) {

        var results = [];

        for (var i = 0, il = draftResults.length; i < il; ++i) {
            var draftResult = draftResults[i];
            var player = draftResult.player

            if (drops.indexOf(player) === -1) {
                results.push({
                    player: player,
                    cost: draftResult.cost,
                    term: draftResult.status === 'D' ? 2016 : 2015
                });
            }
        }

        return results;
    };

    var contracts = prepareContracts(DraftResults, Drops);


    var indexOfPlayer = function (name, list) {

        for (var i = 0, il = list.length; i < il; ++i) {
            var listName = list[i].player;
            if (listName.indexOf(name) > -1) {
                return i;
            }
        }

        return -1;
    };

    var prepareRosters = function (rosters) {

        var results = {};

        for (var team in rosters) {
            var roster = rosters[team];
            results[team] = [];

            for (var i = 0, il = roster.length; i < il; ++i) {
                var name = roster[i];
                var index = indexOfPlayer(name, contracts);

                results[team].push({
                    player: name,
                    cost: index > -1 ? contracts[index].cost : 15,
                    term: index > -1 ? contracts[index].term : 2016
                });
            }
        }

        return results;
    };

    var rosters = prepareRosters(FinalRosters);


    var printRoster = function (team, roster) {

        for (var i = 0, il = roster.length; i < il; ++i) {
            var contract = roster[i];
            console.log(team + '\t' + contract.player + '\t' + contract.cost + '\t' + contract.term)
        }
    };

    for (var team in rosters) {
        printRoster(team, rosters[team]);
    }
};

internals.main();
