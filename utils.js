function getSerializedObjectAsJSON(obj) {
  return JSON.stringify(obj);
}

function getObjectFromJSON(json) {
  return JSON.parse(json);
}

function updateLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function getLocalStorageItemValue(key) {
  return localStorage.getItem(key);
}

function updateGameObject(score, round) {
  gameObj.score = score;
  gameObj.round = round;
}

function saveGameObjectToLocalStorage(score, round) {
  updateGameObject(score, round);
  updateLocalStorageItem(
    localStorageGameKey,
    getSerializedObjectAsJSON(gameObj)
  );
}
