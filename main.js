var gameData = {
  pie: 0,
  piePerClick: 1
}

function cookPie() {
  gameData.pie += gameData.piePerClick
  document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
}
