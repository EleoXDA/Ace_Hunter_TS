const cardObjectDefinitions = [
  { id: 1, imagePath: '../Ace_Hunter_JS/images/card-KingHearts.png' },
  { id: 2, imagePath: '../Ace_Hunter_JS/images/card-JackClubs.png' },
  { id: 3, imagePath: '../Ace_Hunter_JS/images/card-QueenDiamonds.png' },
  { id: 4, imagePath: '../Ace_Hunter_JS/images/card-AceSpades.png' },
];
const aceId = 4;
const cardBackImgPath = '../Ace_Hunter_JS/images/card-back-blue.png';
let cards = [];
const playGameButtonElem = document.getElementById('playGame');
const cardContainerElem = document.querySelector('.card-container');
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = '.card-pos-a';
const numCards = cardObjectDefinitions.length;
let cardPositions = [];
let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;
const currentGameStatusElem = document.querySelector('.current-status');
const scoreContainerElem = document.querySelector('.header-score-container');
const scoreElem = document.querySelector('.score');
const roundContainerElem = document.querySelector('.header-round-container');
const roundElem = document.querySelector('.round');
const winColor = 'green';
const loseColor = 'red';
const primaryColor = 'black';
let roundNum = 0;
let maxRounds = 4;
let score = 0;
let gameObj = {};
const localStorageGameKey = 'HTA';
