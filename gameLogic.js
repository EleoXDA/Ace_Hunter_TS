loadGame();

function gameOver() {
  updateStatusElement(scoreContainerElem, 'none');
  updateStatusElement(roundContainerElem, 'none');

  const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span> Click 'Play Game' button to play again`;

  updateStatusElement(
    currentGameStatusElem,
    'block',
    primaryColor,
    gameOverMessage
  );

  gameInProgress = false;
  playGameButtonElem.disabled = false;
}

function endRound() {
  setTimeout(() => {
    if (roundNum == maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    saveGameObjectToLocalStorage(score, roundNum);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        'block',
        primaryColor,
        'Card positions revealed'
      );

      endRound();
    }, 3000);
    cardsRevealed = true;
  }
}

function calculateScoreToAdd(roundNum) {
  if (roundNum == 1) {
    return 100;
  } else if (roundNum == 2) {
    return 50;
  } else if (roundNum == 3) {
    return 25;
  } else {
    return 10;
  }
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
  updateStatusElement(
    scoreElem,
    'block',
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
}

function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElement(
      currentGameStatusElem,
      'block',
      winColor,
      'Hit!! - Well Done!! :)'
    );
  } else {
    updateStatusElement(
      currentGameStatusElem,
      'block',
      loseColor,
      'Missed!! :('
    );
  }
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function loadGame() {
  createCards();

  cards = document.querySelectorAll('.card');

  cardFlyInEffect();

  playGameButtonElem.addEventListener('click', () => startGame());

  updateStatusElement(scoreContainerElem, 'none');
  updateStatusElement(roundContainerElem, 'none');
}

function checkForIncompleteGame() {
  const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);
  if (serializedGameObj) {
    gameObj = getObjectFromJSON(serializedGameObj);

    if (gameObj.round >= maxRounds) {
      removeLocalStorageItem(localStorageGameKey);
    } else {
      if (confirm('Would you like to continue with your last game?')) {
        score = gameObj.score;
        roundNum = gameObj.round;
      }
    }
  }
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {
  score = 0;
  roundNum = 0;

  checkForIncompleteGame();

  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, 'flex');
  updateStatusElement(roundContainerElem, 'flex');

  updateStatusElement(
    scoreElem,
    'block',
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
  updateStatusElement(
    roundElem,
    'block',
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {
  roundNum++;
  playGameButtonElem.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    'block',
    primaryColor,
    'Shuffling...'
  );

  updateStatusElement(
    roundElem,
    'block',
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function shuffleCards() {
  let shuffleCount = 0;
  const id = setInterval(shuffle, 12);

  function shuffle() {
    randomizeCardPositions();

    animateShuffle(shuffleCount);

    if (shuffleCount == 500) {
      clearInterval(id);
      shufflingInProgress = false;
      removeShuffleClasses();
      dealCards();
      updateStatusElement(
        currentGameStatusElem,
        'block',
        primaryColor,
        'Please click the card that you think is the Ace of Spades...'
      );
    } else {
      shuffleCount++;
    }
  }
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = '';
  let secondPart = '';
  let areas = '';

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + 'a ';
    } else if (cardPositions[index] == 2) {
      areas = areas + 'b ';
    } else if (cardPositions[index] == 3) {
      areas = areas + 'c ';
    } else if (cardPositions[index] == 4) {
      areas = areas + 'd ';
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = '';
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });

  return `"${firstPart}" "${secondPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}
