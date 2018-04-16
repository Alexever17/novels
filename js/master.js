
var mobileMenu = false;

document.querySelector(".icon").addEventListener("click", function() {
    var el = document.querySelectorAll("#header .holder-wrap a");
    if (mobileMenu) {
        for (var i = 1; i < el.length; i++) {
            el[i].style.display = "none";
            el[i].className = "menu-links";
        }
    } else {
        for (var j = 1; j < el.length; j++) {
            el[j].style.display = "block";
            el[j].className = "mobile-link";
        }
    }
    mobileMenu = (mobileMenu) ? false : true;
});


//this function is sorting the accordion elements in the page its being invoked on
function sortList() {
    // this creates a true array out of the html collection given by the queryselector
    var oldArray = Array.prototype.slice.call(document.querySelectorAll(".accordion"));
    //clone of the first array to keep the old one intact
    var newArray = Array.from(oldArray);
    //easier sorting by removing the sub menu
    newArray.shift();
    //sorting the accordings by their titles with the help of an exptra compare function
    newArray.sort(compareAccordions);
    //the new Array reversed
    var reversedNewArray = Array.from(newArray).reverse();
    //giving back the sub menu
    newArray.unshift(oldArray[0]);
    reversedNewArray.unshift(oldArray[0]);
    return [newArray, reversedNewArray, oldArray];
}

// this is a compare function for the sort from sortList(), here we traverse through the html elemenets
// to the titles accordion --> full-list-titles --> h3 titles --> names
function compareAccordions(a, b) {
    if (a.children[1].children[0].innerHTML < b.children[1].children[0].innerHTML)
        return -1;
    if (a.children[1].children[0].innerHTML > b.children[1].children[0].innerHTML)
        return 1;
    return 1;
}

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
            <h4 id="close" class="close" onclick="closeModal()">x</h4>
            <h3 class="title">${novel.name}</h3>
            <h4 class="ranking">Rating: ${novel.ranking}/5</h4>
            <div class="holder">
                <a href="${novel.picSource}">
                    <img src="${novel.picSource}" alt="${novel.name} Cover" class="cover" width="230px" height="329px">
                </a>
            </div>
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

//takes in the id of the given novel and checks the title for the number of characters.
//if its higher than the limiter, it gets cut
function underXXCharacterCheck(name, limiter) {
    return (name.length >= limiter) ? name.slice(0, limiter) + "..." : name;
}
