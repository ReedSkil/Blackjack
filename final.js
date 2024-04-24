function clear(){
	playerHand = document.getElementById('player-hand');
	dealerHand = document.getElementById('dealer-hand');
	pcard3.style.display = 'none';
	pcard4.style.display = 'none';
	pcard5.style.display = 'none';
	pcard6.style.display = 'none';
	pcard7.style.display = 'none';
	playerHand.style.width = "225px";
	dcard2.style.display = 'none';
	dcard3.style.display = 'none';
	dcard4.style.display = 'none';
	dcard5.style.display = 'none';
	dcard6.style.display = 'none';
	dcard7.style.display = 'none';
	dealerHand.style.width = "225px";
}

function valueconvert(value){
	switch(value){
		case "jack":
			return '10';
			break;
		case "queen":
			return '10';
			break;
		case "king":
			return '10';
			break;
		case "ace":
			return '11';
			break;
		default:
			return value;
			break;
	};
}

function createdeck(){
	deck = [];
	deckpng = [];
	suits = ['clubs', 'diamonds', 'hearts', 'spades'];
	values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

	suits.forEach(suit => {
		values.forEach(value => {
			cardnamepng = `cards/${value}_of_${suit}.png`;
			deckpng.push(cardnamepng);
			deck.push([valueconvert(value), suit]);
			
		});
	});
	return [deck, deckpng];
}


function draw(deck, deckpng, scard, width){
    index = Math.floor(Math.random() * deck.length);
    pair = deck[index];
	console.log(pair[0]);
	console.log(scard);
	card = document.getElementById(scard);
	card.style.display = 'block';
	console.log(deckpng[index]);
	card.src=deckpng[index]
	playerHand.style.width = String(width + 110) + "px";
	//returns the value of the card and its index in the array
    return pair[0];
}

function game() {
	result = document.getElementById('results');
	result.style.display = 'none';
	clear();
    decks = createdeck();
	deck = decks[0];
	deckpng = decks[1];
	console.log(deck);
	console.log(deckpng);
	
	total = 0;
	dtotal = 0;
	pcards = ['pcard1', 'pcard2', 'pcard3', 'pcard4', 'pcard5', 'pcard6', 'pcard7'];
	dcards = ['dcard1', 'dcard2', 'dcard3', 'dcard4', 'dcard5', 'dcard6', 'dcard7'];
	width = 0;
	dwidth = 0;
	hit();
	hit();
}

//pcard1.src = 'cards/3_of_clubs.png';
function hit() {
	if (total <= 21 && pcards.length != 0){
		total += parseInt(draw(deck, deckpng, pcards[0], width));
		width += 110;
		playerHand.style.width = String(width) + "px";
		pcards.shift();
	}
	if (total > 21){
		lose(); 
	}if (pcards.length == 0){
		stand(total);
	}
	console.log(total);
}

function dhit() {
	if (dtotal <= 16 && dcards.length != 0){
		dtotal += parseInt(draw(deck, deckpng, dcards[0], dwidth));
		dwidth += 110;
		dealerHand.style.width = String(dwidth) + "px";
		dcards.shift();
	}
	console.log(dtotal);
}

function stand() {
	while (dtotal < 17){
		dhit();
	}
	if(dtotal > 21){
		win();
	}else{
		if (total > dtotal && total <= 21){
			win();
		}else{
			lose();
		}
	}
}

function win(){
	console.log("WIN");
	result.src="win.jpg";
	result.style.display = 'block';
}

function lose(){
	console.log("LOSE");
	result.src="lose.png";
	result.style.display = 'block';
}

// Event listeners for buttons
document.getElementById('restart-button').addEventListener('click', game);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

// Call init function to start the game
game();