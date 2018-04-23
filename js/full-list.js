
window.onload = function(){
    asyncCall(1);
}

//async make it easier to make promises and await for the requests
async function asyncCall(sortID) {
    //axios is a open source js file which makes get request very easy
    const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels?sort=${sortID}`);
    document.getElementById('insertRequestDataHere').innerHTML = "";
    //gets the array with the data and makes all the small html elements
    tableConstructor(novel.data, novel.data.length);
    //make the moduleboxes for the loaded novels
    moduleConstructor(novel.data, novel.data.length, "full-list");
    //remonves the preloader
    if (document.getElementById('spinner')) {
        document.getElementById('spinner').remove();
    }
}

//makes a div element out of the get request and puts it into the slider
function tableConstructor(novel, numberIterations) {
    for (var i = 0; i < numberIterations; i++) {
        //the slider elements
        var novelDIV = document.createElement("tr");
        novelDIV.setAttribute("class", "novelTable");
        // the elements structure
        novelDIV.innerHTML = `
                 <td class="hideMobile">${i+1}</td>
                 <td class="hideMobile"><img src="${novel[i].picSource}" /></td>
                 <td class="alignLeft">${novel[i].name}</td>
                 <td>${novel[i].ranking} / 5</td>
                 <td><button uk-toggle="target: #id${novel[i]._id}" class="uk-button uk-button-primary modalButton">Info</button>
         `
        document.getElementById('insertRequestDataHere').appendChild(novelDIV);
    }
}

let name = 3; let rating = 1;
document.getElementById("asyncCallerName").addEventListener("click", function() {
    document.getElementById('asyncCallerName').classList.add("textDecorator");
    document.getElementById('asyncCallerRating').classList.remove("textDecorator");
    if (name == 3) {
        asyncCall(3);
        name = 4;
    } else {
        asyncCall(4)
        name = 3;
    }
});
document.getElementById("asyncCallerRating").addEventListener("click", function() {
    document.getElementById('asyncCallerName').classList.remove("textDecorator");
    document.getElementById('asyncCallerRating').classList.add("textDecorator");
    if (name == 1) {
        asyncCall(1);
        name = 2;
    } else {
        asyncCall(2)
        name = 1;
    }
});
