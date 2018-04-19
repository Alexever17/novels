//takes as variable the id for the lib entry and inputs the data into the modal which is first hidden.
function openModal(id) {
    //on starting the function, the modal box which is hidden is set to block
    document.getElementById('modalTop').style.display = "block";
    console.log(id);
    asyncCall();
    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novel/${id}`);
        //gets the data and fills the modal box with data
        console.log("success");
        modalConstructor(novel.data);
    }

    function modalConstructor(novel) {
        //loading the container element for the text of the modal box "modalContent", because the 'modalTop' class is just semi transparent black
        var modal = document.querySelector(".modalContent");
        //loading the empty html structure to the modal
        modal.innerHTML = `
            <h4 class="btn purple lighten-2 stickOn" onclick="closeModal()">Close</h4>
            <h4 class="title">${novel.name}</h4>
            <h5 class="ranking">Rating: ${novel.ranking}/5</h5>
            <img src="${novel.picSource}" alt="${novel.name} Cover" width="230px" height="329px">
            <div class="linkparent">
                <a href="${novel.url}" class="link">More Information here</a>
            </div>
            <p class="description"><b>Description: </b><br>${novel.description}</p>
        `
    }
}

//closes the modal
function closeModal() {
    document.getElementById('modalTop').style.display = "none";
    //resets the innerhtml to empty so that a new novel can be loaded inside
    document.querySelector(".modalContent").innerHTML = "";
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
