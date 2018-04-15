window.onload = function(){

    //ids of novels to load into the homepage
    var homepageIDs = ["5ad264c4835be300042faab8", "5ad26562835be300042faab9", "5ad265b7835be300042faaba"];
    //array to store the get request necessery to build the homepage
    var promises = [];

    for (var i = 0; i < 3; i++) {
        promises.push(axios.get('https://alexever17.herokuapp.com/api/novels?id=' + homepageIDs[i]));
    }

    //forces to wait for all the promises to be fullfilled, enables to use the for loop
    Promise.all(promises)
    .then((response) => {
        for (var i = 0; i < 3; i++) {
            //this take the response from the get request, takes only the data from it and sends it to the
            //divConstructor function which makes an html element with all the data from the request
            divConstructor(response[i].data);
        }
    })
    .catch((error) => {
        console.log(error);
    });
};

//takes in JSON from an get request and generates and adds a html element with this information
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
