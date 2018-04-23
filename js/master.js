//takes in the id of the given novel and checks the title for the number of characters.
//if its higher than the limiter, it gets cut
function underXXCharacterCheck(name, limiter) {
  return (name.length >= limiter) ? name.slice(0, limiter) + "..." : name;
}

//shuffles the given arrays elements
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

//makes the modal boxes for the novels
function moduleConstructor(novel, numberIterations, htmlBody) {

    for (var i = 0; i < numberIterations; i++) {

        var modal = document.createElement("div");
        modal.setAttribute("id", "id" + novel[i]._id);
        modal.setAttribute("uk-modal", "")
        // the elements structure
        modal.innerHTML = `
        <div class="uk-modal-dialog uk-modal-body">
            <div class="modalNovel">
                <button class="uk-modal-close uk-button uk-button-danger" type="button">X Close</button>
                <h4 class="title uk-modal-title uk-heading-line uk-text-center">${novel[i].name}</h4>
                <div class="pictureholder">
                    <img src="${novel[i].picSource}" alt="${novel[i].name} Cover" class="cover">
                </div>
                <h4 class="ranking uk-text-center">Rating: ${novel[i].ranking}/5</h4>
                <a href="${novel[i].url}" class="uk-align-center" id="informationButton">
                    <button class="uk-button uk-button-primary modalButton uk-align-center">Novelupdates.com</button>
                </a>
                <p class="description"><b>Description:</b><br>${novel[i].description}</p>
            </div>
        </div>
        `
        document.getElementById(htmlBody).appendChild(modal);
    }
}
