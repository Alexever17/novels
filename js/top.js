//first load of data for top.html when its accessed
window.onload = function(){
    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/ranking/5`);
        //gets the array with the data and makes all the small html elements
        thumbnailConstructor(novel.data);
    }

    asyncCall();

    function thumbnailConstructor(response) {
        //only a certain number of characters can be in the name to not break the design
        var characterLimiter = 35;
        //there are 8 thumbnails on the website
        for (var i = 0; i < 8; i++) {

            var nameInsert = underXXCharacterCheck(response[i].name, characterLimiter);
            var novel = document.createElement("div");
            novel.setAttribute("class", "thumbnail");

            novel.innerHTML = `
                <h4 class="info" onclick="openModal(${response[i]._id})">i</h4>
                <div class="holder">
                    <a href="${response[i].picSource}">
                        <img src="${response[i].picSource}" alt="${response[i].name} Cover" class="cover" width="146px" height="210px">
                    </a>
                </div>
                <h3 class="title">${nameInsert}</h3>
            `

            var lineNumber = (i < 4) ? 0 : 1;
            //there are 2 lines which can take in up to 4 thumbnails
            document.querySelectorAll(".line")[lineNumber].appendChild(novel);
        }
    }
}
