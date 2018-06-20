// world cup api from - https://github.com/openfootball/world-cup.json
const api = "https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json";

// sorts the teams by points and then by conceeded
function compare(a, b) {
  return a.points - b.points || a.conceeded - b.conceeded;
}

// calculates the points based on scores a and b
function score(a, b) {
  if (a === null && b === null)
    return 0;
  else if (a === b)
    return 1;
  else if (a > b)
    return 3;
  else
    return 0;
}

// team class - this gets used in the teams array below
class Team {
  constructor(name, player) {
    this.name = name;
    this.player = player;
    this.points = 0;
    this.conceeded = 0;
  }
}

// list of players - the index of the player is used below
const players = [
  "Chris",
  "Craig",
  "Dan",
  "Ellie",
  "James",
  "Kirsty",
  "Kris",
  "Matt",
  "Mike",
  "Natalie",
  "Paul",
  "Rachel",
  "Wes",
  "Joe"
]

// list of teams with corresponding player index from the player array
const teams = [
  new Team("Portugal", 0),
  new Team("Mexico", 0),
  new Team("Russia", 1),
  new Team("Uruguay", 1),
  new Team("Nigeria", 2),
  new Team("Poland", 2),
  new Team("Saudi Arabia", 3),
  new Team("Spain", 3),
  new Team("Japan", 3),
  new Team("Peru", 4),
  new Team("Croatia", 4),
  new Team("Brazil", 5),
  new Team("Colombia", 5),
  new Team("France", 6),
  new Team("Costa Rica", 6),
  new Team("Tunisia", 7),
  new Team("Iran", 7),
  new Team("Argentina", 7),
  new Team("Switzerland", 8),
  new Team("Sweden", 8),
  new Team("Iceland", 9),
  new Team("Panama", 9),
  new Team("England", 9),
  new Team("Morocco", 10),
  new Team("Denmark", 10),
  new Team("South Korea", 11),
  new Team("Belgium", 11),
  new Team("Australia", 11),
  new Team("Germany", 12),
  new Team("Senegal", 12),
  new Team("Egypt", 13),
  new Team("Serbia", 13)
]

// fetches the world cup json file
fetch(api)
.then(response => response.json())
.then(worldcup => {

  // loops through all the rounds and matches
  for(let round of worldcup.rounds) {
    for(let match of round.matches) {

      let team1 = match.team1.name;
      let score1 = match.score1;

      let team2 = match.team2.name;
      let score2 = match.score2;

      for(let team of teams) {

        // add conceeded and points to team 1
        if (team.name === team1) {
          team.conceeded -= score2;
          team.points += score(score1, score2);
        }

        // add conceeded and points to team 2
        if (team.name === team2) {
          team.conceeded -= score1;
          team.points += score(score2, score1);
        }

      }

    }
  }

})
.then(() => {

  // sorts the teams array by points and then conceeded
  teams.sort(compare);

  // create a table element
  let table = document.createElement("table");

  // adds header to the table
  let position = document.createElement("th");
      position.innerHTML = "#";
  let name = document.createElement("th");
      name.innerHTML = "Team";
  let player = document.createElement("th");
      player.innerHTML = "Name";
  let points = document.createElement("th");
      points.innerHTML = "Points";
  let conceeded = document.createElement("th");
      conceeded.innerHTML = "Conceeded";

  let row = document.createElement("tr");
      row.appendChild(position);
      row.appendChild(name);
      row.appendChild(player);
      row.appendChild(points);
      row.appendChild(conceeded);

  table.appendChild(row);

  // adds all the teams to the table
  for(let [index, team] of teams.entries()) {

    let position = document.createElement("td");
        position.innerHTML = index + 1;
    let name = document.createElement("th");
        name.innerHTML = team.name;
    let player = document.createElement("td");
        player.innerHTML = players[team.player];
    let points = document.createElement("td");
        points.innerHTML = team.points;
    let conceeded = document.createElement("td");
        conceeded.innerHTML = team.conceeded;

    let row = document.createElement("tr");
        row.appendChild(position);
        row.appendChild(name);
        row.appendChild(player);
        row.appendChild(points);
        row.appendChild(conceeded);

    table.appendChild(row);

  }

  // append table to body element
  document.body.appendChild(table);

});
