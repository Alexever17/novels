
window.onload = function(){

    //on the frontpage there is a message box which has a date inside, this displays the time since the message was created
    function calcDate() {
        const date1 = new Date(2018,3,17,12,0);
        const date2 = new Date();
        let daysAgo = Math.round( (date2 - date1) / 1000 / 60 / 60 / 24 );
        document.getElementById("timeStamp").innerHTML = `${daysAgo} days ago`;
    }

    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/ranking/5`);
        //gets the array with the data and makes all the small html elements
        divConstructor(novel.data);
        //make the moduleboxes for the loaded novels
        moduleConstructor(novel.data, 8, "main");
        //remonves the preloader
        document.getElementById('spinner').remove();
        document.getElementById('spinner2').remove();
        document.getElementById('spinner3').remove();
        document.getElementById('dbStatus').innerHTML = "Okay";
    }

    asyncCall();
    calcDate();

    //makes a div element out of the get request and puts it into the slider
    function divConstructor(novel) {
        //random shuffle of the novels -- master.js
        novel = shuffle(novel);
        //some names are too long, so only 46 chars allowed
        characterLimiter = 40;
        characterMinimum = 27;

        for (var i = 0; i < 8; i++) {

            //shortening function for the name
            var nameInsert = underXXCharacterCheck(novel[i].name, characterLimiter);
            // if a name is to short, it gets a <br> element to have constant height everywhere
            nameInsert = (nameInsert.length < characterMinimum) ? nameInsert + "<br><br>" : nameInsert;

            //the slider elements
            var novelDIV = document.createElement("div");
            novelDIV.setAttribute("class", "novel");
            // the elements structure
            novelDIV.innerHTML = `
                <h4 class="title uk-heading-line uk-text-center">${nameInsert}</h4>
                <div><img src="${novel[i].picSource}" alt="${novel[i].name} Cover" class="cover">
                <h5 class="ranking uk-text-center">Rating: ${novel[i].ranking}/5</h5>
                <button uk-toggle="target: #id${novel[i]._id}" class="uk-button uk-button-primary modalButton">More Information</button>
                </div>
            `
            document.querySelectorAll(".sliderParent")[i].appendChild(novelDIV);
        }
    }
 }
