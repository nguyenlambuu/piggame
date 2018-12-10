/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying, inputScore;

init();

// Click button roll the dice
document.querySelector('.btn-roll').addEventListener('click', () => {
	if (gamePlaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1; // Random number from 1 to 6
		var dice2 = Math.floor(Math.random() * 6) + 1; // Random number from 1 to 6

		// 2. Display result
		document.querySelector('.btn-hold').style.display = 'block';
		document.querySelectorAll('.dice').forEach(d => (d.style.display = 'block'));

		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		// 3. Update the roundScore if the rolled was NOT 1
		if (dice1 !== 1 && dice2 !== 1) {
			roundScore += dice1 + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

// Click button hold
document.querySelector('.btn-hold').addEventListener('click', () => {
	if (gamePlaying) {
		// 1. Add current score to GLOBAL score
		scores[activePlayer] += roundScore;
		// 2. Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		// 3. Check if player WON a game

		if (inputScore) {
			winningScore = inputScore;
		} else {
			winningScore = 20;
		}

		if (scores[activePlayer] >= winningScore) {
			gamePlaying = false;
			document.getElementById('name-' + activePlayer).textContent = 'winner';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			document.querySelector('.btn-new').style.display = 'block';
			document.getElementById('final-score').style.display = 'none';
		} else {
			nextPlayer();
		}
	}
});

// Click button new game
document.querySelector('.btn-new').addEventListener('click', () => {
	init();
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	inputScore = parseInt(prompt('Enter final score you want to win?', '100'));

	document.querySelector('.btn-new').style.display = 'none';
	document.getElementById('final-score').textContent = inputScore;
	document.getElementById('final-score').style.display = 'block';
	gamePlaying = true;
});

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.querySelectorAll('.dice').forEach(d => (d.style.display = 'none'));
	document.querySelectorAll('.player-current-score').forEach(c => (c.textContent = 0));
	document.querySelectorAll('.player-current-score').forEach(c => (c.textContent = 0));

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0; // 0 is first player
	gamePlaying = false;
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.getElementById('final-score').style.display = 'none';
	document.getElementById('name-0').textContent = 'player 1';
	document.getElementById('name-1').textContent = 'player 2';
	document.querySelectorAll('.dice').forEach(d => (d.style.display = 'none'));
	document.querySelectorAll('*.-score').forEach(s => console.log(s));
	document.querySelectorAll('.player-current-score').forEach(c => (c.textContent = 0));
	document.querySelectorAll('.player-score').forEach(s => (s.textContent = 0));
}
