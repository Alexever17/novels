//takes in the id of the given novel and checks the title for the number of characters.
//if its higher than the limiter, it gets cut
function underXXCharacterCheck(name, limiter) {
  return (name.length >= limiter) ? name.slice(0, limiter) + "..." : name;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
