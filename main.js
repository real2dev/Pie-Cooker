// Main Game Data Storage

var saveGame = localStorage.getItem('pieCookerSave');
let gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  piePerSecond: 0,
  chefCost: 10,
  kitchenCost: 100,
  chefAmt: 0,
  kitchenAmt: 0,
  upgradesBought: 0,
  lastTick: Date.now(),
};

// Formatting / Non-Game Functions

function tab(tab) {
  document.getElementById('upgradeMenu').style.display = 'none';
  document.getElementById('cookPieMenu').style.display = 'none';
  document.getElementById('shopMenu').style.display = 'none';
  document.getElementById('donateMenu').style.display = 'none';
  document.getElementById(tab).style.display = 'inline-block';
}
tab('cookPieMenu');

function hide(element) {
  document.getElementById(element).style.display = 'none';
}

function show(element) {
  document.getElementById(element).style.display = 'inline';
}

function checkdata(dataid) {
  if (typeof saveGame[dataid] !== 'undefined') {
    gameData[dataid] = saveGame[dataid];
  }
}

// In Game Functions

function upgrade(amount, variable, price, id) {
  if (gameData.pie >= price) {
    gameData.pie -= price
    gameData.upgradesBought += 1
    gameData.piePerSecond *= amount 
    hide(id)
  }
}

function cookPie() {
  gameData.pie += gameData.piePerClick;
  document.getElementById('pieCooked').innerHTML = `${format(gameData.pie, 'engineering')} Pies Cooked`;
}

function buyPiePerClick() {
  if (gameData.pie >= gameData.piePerClickCost) {
    gameData.pie -= gameData.piePerClickCost; // Remove the extra closing parenthesis here
    gameData.piePerClickCost = 10 * (1.5 ** gameData.piePerClick);
    gameData.piePerClick += 1;
    document.getElementById('pieCooked').innerHTML = `${format(gameData.pie, 'engineering')} Pies Cooked`;
    document.getElementById('perClickUpgrade').innerHTML = `Upgrade Oven (Currently Level ${format(gameData.piePerClick, 'engineering')}) Cost: ${format(gameData.piePerClickCost, 'engineering')} Pies`;
  }
}

function buyChef() {
  if (gameData.pie >= gameData.chefCost) {
    gameData.pie -= gameData.chefCost;
    gameData.piePerSecond += 1;
    gameData.chefAmt += 1;
    gameData.chefCost = 15 * (1.5 ** gameData.chefAmt);
    document.getElementById('pieCooked').innerHTML = `${format(gameData.pie, 'engineering')} Pies Cooked`;
    document.getElementById('buyChef').innerHTML = `Buy A Chef (Currently Have:  ${format(gameData.chefAmt, 'engineering')}) Cost: ${format(gameData.chefCost, 'engineering')} Pies`;
  }
}

function buyKitchen() {
  if (gameData.pie >= gameData.kitchenCost) {
    gameData.pie -= gameData.kitchenCost;
    gameData.piePerSecond += 5;
    gameData.kitchenAmt += 1;
    gameData.kitchenCost = 100 * (1.5 ** gameData.kitchenAmt);
    document.getElementById('pieCooked').innerHTML = `${format(gameData.pie, 'engineering')} Pies Cooked`;
    document.getElementById('buyKitchen').innerHTML = `Buy A Kitchen (Currently Have:  ${format(gameData.kitchenAmt, 'engineering')}) Cost: ${format(gameData.kitchenCost, 'engineering')} Pies`;
  }
}

// Main Game Data Control

const mainGameLoop = window.setInterval(() => {
  const diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now(); // Don't forget to update lastTick.
  gameData.pie += gameData.piePerSecond * (diff / 1000); // divide diff by how often (ms) mainGameLoop is ran
  document.getElementById('pieCooked').innerHTML = `${format(gameData.pie, 'engineering')} Pies Cooked`;
  document.getElementById('perClickUpgrade').innerHTML = `Upgrade Oven (Currently Level ${format(gameData.piePerClick, 'engineering')}) Cost: ${format(gameData.piePerClickCost, 'engineering')} Pie`;
  document.getElementById('buyChef').innerHTML = `Buy A Chef (Currently Have:  ${format(gameData.piePerSecond, 'engineering')}) Cost: ${format(gameData.chefCost, 'engineering')} Pies`;
  document.getElementById('piePerSecond').innerHTML = `${format(gameData.piePerSecond, 'engineering')} Pie Per Second`;
  document.getElementById('piePerCook').innerHTML = `${format(gameData.piePerClick, 'engineering')} Pies Per Click`;
  document.getElementById('buyKitchen').style.display = 'none';
  document.getElementById('buyKitchen').innerHTML = `Buy A Kitchen (Currently Have: ${format(gameData.kitchenAmt, 'engineering')}) Cost: ${format(gameData.kitchenCost, 'engineering')}`;
  if (gameData.piePerSecond > 10) {
      document.getElementById('buyKitchen').style.display = 'inline';
 }    
}, 1000);

const saveGameLoop = window.setInterval(() => {
  localStorage.setItem('pieCookerSave', JSON.stringify(gameData));
}, 15000);

var saveGame = JSON.parse(localStorage.getItem('pieCookerSave'));
if (saveGame !== null) {
  gameData = saveGame;
}

function format(number, type) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const exponent = Math.floor(Math.log10(number));
  const mantissa = number / Math.pow(10, exponent);

  if (exponent < 3) return number.toFixed(0);
  if (type == 'scientific') return `${mantissa.toFixed(2)}e${exponent}`;
  if (type == 'engineering') {
    const suffixIndex = Math.floor(exponent / 3);
    return (mantissa * Math.pow(10, exponent % 3)).toFixed(2) + suffixes[suffixIndex];
  }
}

if (saveGame !== null) {
  for (let property in gameData) {
    checkdata(property);
  }
}
