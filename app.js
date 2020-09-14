var scores, roundScore, activePlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
	var dice1 = Math.floor(Math.random() * 6) + 1;
	var dice2 = Math.floor(Math.random() * 6) + 1;

	document.querySelector('#dice-1').style.display = 'block';
	document.querySelector('#dice-2').style.display = 'block';

	document.querySelector('#dice-1').src = `dice-${dice1}.png`;
	document.querySelector('#dice-2').src = `dice-${dice2}.png`;
	if (dice1 === 1 && dice2 === 1) {
		// next player
		nextPlayer();
	} else {
		roundScore += dice1 + dice2;
		document.querySelector('#score-' + activePlayer).textContent = roundScore;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	scores[activePlayer] += roundScore;
	document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];

	var input = document.querySelector('.final-score').value;
	var winningScore;
	if (input) {
		winningScore = input;
	} else {
		winningScore = 100;
	}

	if (scores[activePlayer] >= winningScore) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner';
		document.querySelector('#dice-1').style.display = 'none';
		document.querySelector('#dice-2').style.display = 'none';
		document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
		document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
	} else {
		// next player
		nextPlayer();
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	roundScore = 0;
	document.querySelector('#score-' + activePlayer).textContent = roundScore;
	document.querySelector(`.player-1-panel`).classList.toggle('active');
	document.querySelector(`.player-0-panel`).classList.toggle('active');
	activePlayer = activePlayer === 0 ? 1 : 0;
}

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;

	document.querySelector('#dice-1').style.display = 'none';
	document.querySelector('#dice-2').style.display = 'none';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
}
