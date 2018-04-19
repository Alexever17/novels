$(document).ready(function(){
    $('.sidenav').sidenav();
 });

window.onload = function(){

    counter = 0;

    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/ranking/5`);
        //gets the array with the data and makes all the small html elements
        divConstructor(novel.data);
        if (document.getElementById('preloader')) {
            document.getElementById('preloader').remove();
        }
        $('.carousel').carousel();
    }

    asyncCall();

    //makes a div element out of the get request --> div with class "novel"
    function divConstructor(response) {
        response = shuffle(response);
        characterLimiter = 46;

        for (var i = 0; i < 8; i++) {

            var nameInsert = underXXCharacterCheck(response[i].name, characterLimiter);

            var novel = document.createElement("div");
            novel.setAttribute("class", "carousel-item");
            // the elements structure
            novel.innerHTML = `
            <div class="novel">
                <h4 class="title">${nameInsert}</h4>
                <h5 class="ranking">Rating: ${response[i].ranking}/5</h5>
                <img src="${response[i].picSource}" alt="${response[i].name} Cover" class="cover">
                <button class="btn-small purple lighten-2" onclick="openModal('${response[i]._id}')">More Information</button>
                </div>
            `
            document.getElementById("carousel").appendChild(novel);
        }
    }

    //takes in the id of the given novel and checks the title for the number of characters.
    //if its higher than the limiter, it gets cut
    function underXXCharacterCheck(name, limiter) {
      return (name.length >= limiter) ? name.slice(0, limiter) + "..." : name;
    }
  }
