
window.onload = function(){
    asyncCall(1);
}

//async make it easier to make promises and await for the requests
async function asyncCall(sortID) {
    //axios is a open source js file which makes get request very easy
    const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels?sort=${sortID}`);
    //deletes the content of the table if there is something
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
    var nameInsert;
    for (var i = 0; i < numberIterations; i++) {
        nameInsert = novel[i].name;
        if (novel[i].dropped) {
            nameInsert += ' <span class="uk-label-danger">DROPPED</span>';
        }
        //the row elements
        var novelDIV = document.createElement("tr");
        novelDIV.setAttribute("class", "novelTable");
        // the elements structure
        novelDIV.innerHTML = `
                 <td class="hideMobile">${i+1}</td>
                 <td class="hideMobile"><img src="${novel[i].picSource}" /></td>
                 <td class="alignLeft">${nameInsert}</td>
                 <td>${novel[i].ranking} / 10</td>
                 <td><button uk-toggle="target: #id${novel[i]._id}" class="uk-button uk-button-primary modalButton">Info</button>
         `
        document.getElementById('insertRequestDataHere').appendChild(novelDIV);
    }
}

let name = 3; let rating = 1;
//adding an eventlistener to the name heading of the table
document.getElementById("asyncCallerName").addEventListener("click", function() {
    //adding an underline so that its easier to see which one is active
    document.getElementById('asyncCallerName').classList.add("textDecorator");
    document.getElementById('asyncCallerRating').classList.remove("textDecorator");
    //starts with an alphabetic sorting or reverse if triggered again
    if (name == 3) {
        asyncCall(3);
        name = 4;
    } else {
        asyncCall(4)
        name = 3;
    }
});
//adding an eventlistener to the name heading of the table
document.getElementById("asyncCallerRating").addEventListener("click", function() {
    //adding an underline so that its easier to see which one is active
    document.getElementById('asyncCallerName').classList.remove("textDecorator");
    document.getElementById('asyncCallerRating').classList.add("textDecorator");
    //starts with a sorting of 5 to 1, reverse if called again
    if (name == 1) {
        asyncCall(1);
        name = 2;
    } else {
        asyncCall(2)
        name = 1;
    }
});
