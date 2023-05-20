var saveGame = localStorage.getItem('pieCookerSave');
var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  lastTick: Date.now()
};

function cookPie() {
  gameData.pie += gameData.piePerClick;
  document.getElementById("pieCooked").innerHTML = format(gameData.pie) + " Pies Cooked";
}

function buyPiePerClick() {
  if (gameData.pie >= gameData.piePerClickCost) {
    gameData.pie -= gameData.piePerClickCost;
    gameData.piePerClick += 1;
    gameData.piePerClickCost *= 2;
    document.getElementById("pieCooked").innerHTML = format(gameData.pie) + " Pies Cooked";
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + format(gameData.piePerClick) + ") Cost: " + format(gameData.piePerClickCost) + " Pie";
  }
}

var mainGameLoop = window.setInterval(function() {
  var diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now(); // Don't forget to update lastTick.
  gameData.pie += gameData.piePerClick * (diff / 1000); // divide diff by how often (ms) mainGameLoop is ran
  document.getElementById("pieCooked").innerHTML = format(gameData.pie) + " Pies Cooked";
}, 1000);

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("pieCookerSave", JSON.stringify(gameData));
}, 15000);

var savegame = JSON.parse(localStorage.getItem("pieCookerSave"));
if (savegame !== null) {
  gameData = savegame;
}

function format(number) {
  var exponent = Math.floor(Math.log10(number));
  var mantissa = number / Math.pow(10, exponent);
  if (exponent < 3) return number.toFixed(0);
  return mantissa.toFixed(2) + "e" + exponent;
}

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("cookPieMenu").style.display = "none";
  document.getElementById("shopMenu").style.display = "none";
  document.getElementById(tab).style.display = "inline-block";
}
// go to a tab for the first time, so not all show
tab("cookPieMenu");

if (typeof savegame.pie !== "undefined") gameData.pie = savegame.pie;
if (typeof savegame.piePerClick !== "undefined") gameData.piePerClick = savegame.piePerClick;
if (typeof savegame.piePerClickCost !== "undefined") gameData.piePerClickCost = savegame.piePerClickCost;
if (typeof savegame.lastTick !== "undefined") gameData.lastTick = savegame.lastTick;
