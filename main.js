var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  update: 1.0.1
}

function cookPie() {
  gameData.pie += gameData.piePerClick
  document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
}

function buyPiePerClick() {
  if (gameData.pie >= gameData.piePerClickCost) {
    gameData.pie -= gameData.piePerClickCost
    gameData.piePerClick += 1
    gameData.piePerClickCost *= 2
    document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + gameData.piePerClick + ") Cost: " + gameData.piePerClickCost + " Pie"
  }
}

var mainGameLoop = window.setInterval(function() {
  cookPie()
}, 1000)

var saveGameLoop = window.setInterval(function() {
  document.getElementById("version").innerHTMl = "Version: " + gameData.update
  localStorage.setItem("pieMinerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("pieMinerSave"))
if (savegame !== null) {
  gameData = savegame
}
