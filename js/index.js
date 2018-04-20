window.onload = function(){

    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/ranking/5`);
        //gets the array with the data and makes all the small html elements
        divConstructor(novel.data);
    }

    asyncCall();

    //makes a div element out of the get request --> div with class "novel"
    function divConstructor(response) {
        //random shuffle of the novels -- master.js
        response = shuffle(response);
        //some names are too long, so only 46 chars allowed
        characterLimiter = 46;
        characterMinimum = 27;

        for (var i = 0; i < 8; i++) {

            //shortening function for the name
            var nameInsert = underXXCharacterCheck(response[i].name, characterLimiter);
            nameInsert = (nameInsert.length < characterMinimum) ? nameInsert + "<br><br>" : nameInsert;

            var novel = document.createElement("div");
            novel.setAttribute("class", "uk-cover-container");
            // the elements structure
            novel.innerHTML = `
            <div class="novel">
                <h4 class="title uk-heading-line uk-text-center">${nameInsert}</h4>
                <h5 class="ranking uk-text-center">Rating: ${response[i].ranking}/5</h5>
                <div><img src="${response[i].picSource}" alt="${response[i].name} Cover" class="cover"><div>
                <button class="uk-button uk-button-primary modalButton" onclick="openModal('${response[i]._id}')">More Information</button>
                </div>
            `
            document.querySelectorAll
            document.querySelectorAll(".sliderParent")[i].appendChild(novel);
        }
    }
  }
