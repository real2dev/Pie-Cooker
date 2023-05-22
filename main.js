var saveGame = localStorage.getItem('pieCookerSave')
var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  piePerSecond: 0,
  chefCost: 10,
  kitchenCost: 100,
  chefAmt: 0,
  kitchenAmt: 0,
  lastTick: Date.now(),
}

function cookPie() {
  gameData.pie += gameData.piePerClick
  document.getElementById("pieCooked").innerHTML = format(gameData.pie, "engineering") + " Pies Cooked"
}

function buyPiePerClick() {
  if (gameData.pie >= 10*(1.5**gameData.piePerClick)) {
    gameData.pie -= 10*(1.5**gameData.piePerClick)
    gameData.piePerClickCost = 10*(1.5**gameData.piePerClick)
    gameData.piePerClick += 1
    document.getElementById("pieCooked").innerHTML = format(gameData.pie, "engineering") + " Pies Cooked"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + format(gameData.piePerClick, "engineering") + ") Cost: " + format(gameData.piePerClickCost, "engineering") + " Pies"
  }
}

function buyChef() {
  if (gameData.pie >= gameData.chefCost) {
    gameData.pie -= gameData.chefCost;
    gameData.piePerSecond += 1;
    gameData.chefAmt += 1;
    gameData.chefCost = 15 * (1.5 ** gameData.chefAmt);
    document.getElementById("pieCooked").innerHTML = format(gameData.pie, "engineering") + " Pies Cooked";
    document.getElementById("buyChef").innerHTML = "Buy A Chef (Currently Have:  " + format(gameData.chefAmt, "engineering") + ") Cost: " + format(gameData.chefCost, "engineering") + " Pies";
  }
}

function buyKitchen() {
  if (gameData.pie >= gameData.kitchenCost) {
    gameData.pie -= gameData.kitchenCost;
    gameData.piePerSecond += 5;
    gameData.kitchenAmt += 1;
    gameData.kitchenCost = 100 * (1.5 ** gameData.kitchenAmt);
    document.getElementById("pieCooked").innerHTML = format(gameData.pie, "engineering") + " Pies Cooked";
    document.getElementById("buyKitchen").innerHTML = "Buy A Kitchen (Currently Have:  " + format(gameData.kitchenAmt, "engineering") + ") Cost: " + format(gameData.kitchenCost, "engineering") + " Pies";
  }
}

var mainGameLoop = window.setInterval(function() {
  var diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now(); // Don't forget to update lastTick.
  gameData.pie += gameData.piePerSecond * (diff / 1000); // divide diff by how often (ms) mainGameLoop is ran
  document.getElementById("pieCooked").innerHTML = format(gameData.pie, "engineering") + " Pies Cooked";
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + format(gameData.piePerClick, "engineering") + ") Cost: " + format(gameData.piePerClickCost, "engineering") + " Pie";
  document.getElementById("buyChef").innerHTML = "Buy A Chef (Currently Have:  " + format(gameData.piePerSecond, "engineering") + ") Cost: " + format(gameData.chefCost, "engineering") + " Pies";
  document.getElementById("piePerSecond").innerHTML = format(gameData.piePerSecond, "engineering") + " Pie Per Second";
  document.getElementById("piePerCook").innerHTML = format(gameData.piePerClick, "engineering") + " Pies Per Click";
  document.getElementById("buyKitchen").innerHTML = "Buy A Kitchen (Currently Have: " + gameData.kitchenAmt ") Cost: " + gameData.kitchenCost;
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

if (saveGame !== null) {
  if (typeof saveGame.pie !== "undefined") gameData.pie = saveGame.pie;
  if (typeof saveGame.piePerClick !== "undefined") gameData.piePerClick = saveGame.piePerClick;
  if (typeof saveGame.piePerClickCost !== "undefined") gameData.piePerClickCost = saveGame.piePerClickCost;
  if (typeof saveGame.chefCost !== "undefined") gameData.chefCost = saveGame.chefCost;
  if (typeof saveGame.kitchenCost !== "undefined") gameData.kitchenCost = saveGame.kitchenCost;
  if (typeof saveGame.kitchenAmt !== "undefined") gameData.kitchenAmt = saveGame.kitchenAmt;
  if (typeof saveGame.chefAmt !== "undefined") gameData.chefAmt = saveGame.chefAmt;
  if (typeof saveGame.piePerSecond !== "undefined") gameData.piePerSecond = saveGame.piePerSecond;
  if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
}
