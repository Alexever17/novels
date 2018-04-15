window.onload = function(){
    var homepageIDs = ["5ad264c4835be300042faab8", "5ad26562835be300042faab9", "5ad265b7835be300042faaba"];
    homepageIDs.forEach(async function(id) {
        const novel = await axios.get(`http://localhost:5000/api/novel/${id}`);
        console.log(novel);
        divConstructor(novel.data);

    });

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
