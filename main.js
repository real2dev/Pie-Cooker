var saveGame = localStorage.getItem('pieCookerSave')
var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  lastTick: Date.now()
}

function cookPie() {
  gameData.pie += gameData.piePerClick
  document.getElementById("pieCooked").innerHTML = format(gameData.pie, "scientific") + " Pies Cooked"
}

function buyPiePerClick() {
  if (gameData.pie >= gameData.piePerClickCost) {
    gameData.pie -= gameData.piePerClickCost
    gameData.piePerClick += 1
    gameData.piePerClickCost *= 2
    document.getElementById("pieCooked").innerHTML = format(gameData.pie, "scientific") + " Pies Cooked"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + format(gameData.piePerClick, "scientific") + ") Cost: " + format(gameData.piePerClickCost, "scientific") + " Pie"
  }
}

var mainGameLoop = window.setInterval(function() {
  var diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now(); // Don't forget to update lastTick.
  gameData.pie += gameData.piePerClick * (diff / 1000); // divide diff by how often (ms) mainGameLoop is ran
  document.getElementById("pieCooked").innerHTML = format(gameData.pie, "scientific") + " Pies Cooked";
}, 1000);

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("pieCookerSave", JSON.stringify(gameData));
}, 15000);

var saveGame = JSON.parse(localStorage.getItem("pieCookerSave"));
if (saveGame !== null) {
  gameData = saveGame;
}

function format(number, type) {
  let suffixes = ["", "K", "M", "B", "T"];
  let exponent = Math.floor(Math.log10(number));
  let mantissa = number / Math.pow(10, exponent);
  
  if (exponent < 3) return number.toFixed(0);
  if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent;
  if (type == "engineering") {
    let suffixIndex = Math.floor(exponent / 3);
    return (mantissa * Math.pow(10, exponent % 3)).toFixed(2) + suffixes[suffixIndex];
  }
}

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("cookPieMenu").style.display = "none";
  document.getElementById("shopMenu").style.display = "none";
  document.getElementById("donateMenu").style.display = "none";
  document.getElementById(tab).style.display = "inline-block";
}
// go to a tab for the first time, so not all show
tab("cookPieMenu");

if (typeof saveGame.pie !== "undefined") gameData.pie = saveGame.pie;
if (typeof saveGame.piePerClick !== "undefined") gameData.piePerClick = saveGame.piePerClick;
if (typeof saveGame.piePerClickCost !== "undefined") gameData.piePerClickCost = saveGame.piePerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
