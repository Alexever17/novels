window.onload = function(){
    //the novels loaded into the frontpage
    var homepageIDs = ["5ad264c4835be300042faab8", "5ad26562835be300042faab9", "5ad265b7835be300042faaba"];
    //loops through the array, makes a request with the id out of the array,
    //waits for the response and sends the data to the divConstructor
    homepageIDs.forEach(async function(id) {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novel/${id}`);
        divConstructor(novel.data);
    });

    //makes a div element out of the get request --> div with class "novel"
    function divConstructor(response) {
        var novel = document.createElement("div");
        novel.setAttribute("class", "novel");
        novel.innerHTML = `
            <h3 class="title">${response.name}</h3>
            <h4 class="ranking">Rating: ${response.ranking}/5</h4>
            <div class="holder">
                <a href="${response.picSource}">
                    <img src="${response.picSource}" alt="${response.name} Cover" class="cover" width="230px" height="329px">
                </a>
            </div>
            <div class="linkparent">
                <a href="${response.url}" class="link">More Information here</a>
            </div>
            <p class="description"><b>Description: </b><br>${response.description}</p>
        `
        document.getElementById("main").appendChild(novel);
    }
}
