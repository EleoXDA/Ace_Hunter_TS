function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.add('flip-it');
  } else if (innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.remove('flip-it');
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function cardFlyInEffect() {
  const id = setInterval(flyIn, 5);
  let cardCount = 0;

  let count = 0;

  function flyIn() {
    count++;
    if (cardCount == numCards) {
      clearInterval(id);
      playGameButtonElem.style.display = 'inline-block';
    }
    if (count == 1 || count == 250 || count == 500 || count == 750) {
      cardCount++;
      let card = document.getElementById(cardCount);
      card.classList.remove('fly-in');
    }
  }
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove('shuffle-left');
    card.classList.remove('shuffle-right');
  });
}

function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle('shuffle-left');
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle('shuffle-right');
    card2.style.zIndex = 200;
  }
}
