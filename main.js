var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
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
  }
}
