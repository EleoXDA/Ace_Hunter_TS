function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function createCard(cardItem) {
  const cardElem = createElement('div');
  const cardInnerElem = createElement('div');
  const cardFrontElem = createElement('div');
  const cardBackElem = createElement('div');

  const cardFrontImg = createElement('img');
  const cardBackImg = createElement('img');

  addClassToElement(cardElem, 'card');
  addClassToElement(cardElem, 'fly-in');
  addIdToElement(cardElem, cardItem.id);
  addClassToElement(cardInnerElem, 'card-inner');
  addClassToElement(cardFrontElem, 'card-front');
  addClassToElement(cardBackElem, 'card-back');
  addSrcToImageElem(cardBackImg, cardBackImgPath);
  addSrcToImageElem(cardFrontImg, cardItem.imagePath);
  addClassToElement(cardBackImg, 'card-img');
  addClassToElement(cardFrontImg, 'card-img');
  addChildElement(cardFrontElem, cardFrontImg);
  addChildElement(cardBackElem, cardBackImg);
  addChildElement(cardInnerElem, cardFrontElem);
  addChildElement(cardInnerElem, cardBackElem);
  addChildElement(cardElem, cardInnerElem);
  addCardToGridCell(cardElem);
  initializeCardPositions(cardElem);
  attatchClickEventHandlerToCard(cardElem);
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener('click', () => chooseCard(card));
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function createElement(elemType) {
  return document.createElement(elemType);
}

function addClassToElement(elem, className) {
  elem.classList.add(className);
}

function addIdToElement(elem, id) {
  elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);

  const cardPosElem = document.querySelector(cardPositionClassName);

  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card) {
  if (card.id == 1) {
    return '.card-pos-a';
  } else if (card.id == 2) {
    return '.card-pos-b';
  } else if (card.id == 3) {
    return '.card-pos-c';
  } else if (card.id == 4) {
    return '.card-pos-d';
  }
}
