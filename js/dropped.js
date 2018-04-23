window.onload = function(){
    //async make it easier to make promises and await for the requests
    async function asyncCall() {
        //axios is a open source js file which makes get request very easy
        const novel = await axios.get(`https://alexever17.herokuapp.com/api/novels/ranking/1?sort=1`);
        //gets the array with the data and makes all the small html elements
        thumbnailConstructor(novel.data, novel.data.length);
        //make the moduleboxes for the loaded novels
        moduleConstructor(novel.data, novel.data.length, "dropped");
        //remonves the preloader
        if (document.getElementById('spinner')) {
            document.getElementById('spinner').remove();
        }
    }

    asyncCall();
};
