window.onload = function(){
    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/dropped`);
        //gets the array with the data and makes all the small html elements
        //is in master.js
        thumbnailConstructor(novel.data, novel.data.length);
        //make the moduleboxes for the loaded novels
        //also in master.js takes in "dropped" as the id of the element where to load modals to
        moduleConstructor(novel.data, novel.data.length, "dropped");
        //remonves the preloader
        if (document.getElementById('spinner')) {
            document.getElementById('spinner').remove();
        }
    }

    asyncCall();
};
