// Main Game Data Storage
var saveGame = JSON.parse(localStorage.getItem('pieCookerSave'));
let gameData = {
  pieCooked: 0,
  piePerSecond: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  chefAmt: 0,
  chefCost: 10,
  kitchenAmt: 0,
  kitchenCost: 100,
  upgrade1Amt: 0,
  upgrade1Cost: 5000,
  upgrade2Amt: 0,
  upgrade2Cost: 15250
};

if (saveGame !== null) {
  gameData = saveGame;
}

// Game Loop
window.setInterval(function(){
  cookPies(gameData.piePerSecond);
}, 1000);

// Formatting Numbers
function format(number, type){
  if (type == 'engineering') {
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number / Math.pow(10, exponent);
    if (exponent < 3) {
      return Math.floor(number);
    }
    return mantissa.toFixed(2) + "e" + exponent;
  }
  return number.toLocaleString();
}

// Cook Pie Function
function cookPies(number){
  gameData.pieCooked += number;
  document.getElementById('pieCooked').innerHTML = format(gameData.pieCooked, 'engineering') + " Pies Cooked";
}

// Cook Pie Button
function cookPie(){
  cookPies(gameData.piePerClick);
}

// Buy Pie Per Click Upgrade
function buyPiePerClick(){
  if (gameData.pieCooked >= gameData.piePerClickCost){
    gameData.pieCooked -= gameData.piePerClickCost;
    gameData.piePerClick += 1;
    gameData.piePerClickCost *= 1.1;
    document.getElementById('piePerCook').innerHTML = format(gameData.piePerClick, 'engineering') + " Pies Per Click";
    document.getElementById('perClickUpgrade').innerHTML = `Upgrade Oven (Currently Level ${format(gameData.piePerClick, 'engineering')}) Cost: ${format(gameData.piePerClickCost, 'engineering')} Pies`;
  }
}

// Buy Chef Function
function buyChef(){
  if (gameData.pieCooked >= gameData.chefCost){
    gameData.pieCooked -= gameData.chefCost;
    gameData.chefAmt += 1;
    gameData.chefCost *= 1.1;
    document.getElementById('buyChef').innerHTML = `Buy A Chef (Currently Have: ${format(gameData.chefAmt, 'engineering')}) Cost: ${format(gameData.chefCost, 'engineering')} Pies`;
  }
}

// Buy Kitchen Function
function buyKitchen(){
  if (gameData.pieCooked >= gameData.kitchenCost){
    gameData.pieCooked -= gameData.kitchenCost;
    gameData.kitchenAmt += 1;
    gameData.kitchenCost *= 1.1;
    document.getElementById('buyKitchen').innerHTML = `Buy A Kitchen (Currently Have: ${format(gameData.kitchenAmt, 'engineering')}) Cost: ${format(gameData.kitchenCost, 'engineering')} Pies`;
  }
}

// Upgrade Function
function upgrade(upgrNum, name, cost, id){
  if (gameData.pieCooked >= cost){
    gameData.pieCooked -= cost;
    gameData[name + 'Amt'] += 1;
    cost *= 1.5;
    hide(`upgrade${upgrNum}`);
    document.getElementById(`buy${name}`).innerHTML = `Buy A ${realName} (Currently Have: ${format(gameData[name + 'Amt'], 'engineering')}) Cost: ${format(cost, 'engineering')} Pies`;
  }
}

// Tab Function
function tab(tabName){
  hide('cookPieMenu');
  hide('shopMenu');
  hide('upgradeMenu');
  hide('donateMenu');
  show(tabName);
}

// Hide Element Function
function hide(elementId){
  document.getElementById(elementId).style.display = 'none';
}

// Show Element Function
function show(elementId){
  document.getElementById(elementId).style.display = 'block';
}

// Save Game Function
function saveGame(){
  localStorage.setItem('pieCookerSave', JSON.stringify(gameData));
}

// Load Game Function
function loadGame(){
  gameData = JSON.parse(localStorage.getItem('pieCookerSave'));
  document.getElementById('pieCooked').innerHTML = format(gameData.pieCooked, 'engineering') + " Pies Cooked";
  document.getElementById('piePerCook').innerHTML = format(gameData.piePerClick, 'engineering') + " Pies Per Click";
  document.getElementById('perClickUpgrade').innerHTML = `Upgrade Oven (Currently Level ${format(gameData.piePerClick, 'engineering')}) Cost: ${format(gameData.piePerClickCost, 'engineering')} Pies`;
  document.getElementById('buyChef').innerHTML = `Buy A Chef (Currently Have: ${format(gameData.chefAmt, 'engineering')}) Cost: ${format(gameData.chefCost, 'engineering')} Pies`;
  document.getElementById('buyKitchen').innerHTML = `Buy A Kitchen (Currently Have: ${format(gameData.kitchenAmt, 'engineering')}) Cost: ${format(gameData.kitchenCost, 'engineering')} Pies`;
  document.getElementById('upgrade1').innerHTML = `Mass Purchase Organic Fruits (x2 Pie Per Second) Cost: ${format(gameData.upgrade1Cost, 'engineering')} Pies`;
  document.getElementById('upgrade2').innerHTML = `Buy Better Utensils (x2 Chef Pie Per Second) Cost: ${format(gameData.upgrade2Cost, 'engineering')} Pies`;
}

// Reset Game Function
function resetGame(){
  if (confirm("Are you sure you want to reset your game?")){
    localStorage.removeItem('pieCookerSave');
    location.reload();
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function(){
  loadGame();
});

window.addEventListener('beforeunload', function(){
  saveGame();
});
