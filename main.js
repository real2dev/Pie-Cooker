var pies = 0;

function pieClick(number){
    pies = pies + number;
    document.getElementById("pies").innerHTML = pies;
};

var chefs = 0;

function buyChef(){
    var chefCost = Math.floor(10 * Math.pow(1.1,chefs));     //works out the cost of this cursor
    if(pies >= chefCost){                                   //checks that the player can afford the cursor
        chefs = chefs + 1;                                   //increases number of cursors
    	pies = pies - chefCost;                          //removes the cookies spent
        document.getElementById('chefs').innerHTML = chefs;  //updates the number of cursors for the user
        document.getElementById('pies').innerHTML = pies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,chefs));       //works out the cost of the next cursor
    document.getElementById('chefCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	
	pieClick(chefs);
	
}, 1000);
