import store from "/store.js";
import construct from "/construct.js";
export default {
    bookmarksUrl:"https://thinkful-list-api.herokuapp.com/V/bookmarks/",
    
    postBookmark:function(bookmark)
    {
        
        fetch(this.bookmarksUrl, construct.postData(bookmark)).then(function(resp){
            if(resp.ok)
            {
                store.error = false;
                store.pageState = "main";
                store.clearInput();
                store.init();
                console.log(resp.statusText);
            }
            else
            {
                
                //console.log(resp);
                resp.json().then(function(jsonError){
                    store.errorMessage = jsonError.message;
                    store.error = true;
                    console.log(store.errorMessage);
                    store.render();
                });
                //error handler
                
            }
        });
    },
    getBookmarks:function()
    {    
        fetch(this.bookmarksUrl)
            .then(resp => resp.json())
            .then(jsonResp => store.updateBookmarks(jsonResp));
    },
    deleteBookmark:function(id)
    {
        
        fetch(this.bookmarksUrl + id, construct.delData(id)).then(function(resp){
            if(resp.ok)
            {
                
                console.log(resp.statusText);
                store.init();
            }
            else
            {
                console.log(resp);
                //error handler
            }
        });
    }
}