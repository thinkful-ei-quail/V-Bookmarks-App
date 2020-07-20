import store from "/store.js";
import api from "./api.js";
import construct from "./construct.js";
export default {
    addNewBookmarkBtn:function()
    {
        $("#btn-new").on("click",function(e){
            e.preventDefault();
            store.pageState = "add-bookmark";
            store.ratingSelector = 0;
            store.render();
            console.log("NewBookmark Clicked!");
        });    
    },
    filterSelect:function()
    {
        $(`#select-filter`).on("change",function(e){
            e.preventDefault();
            store.filter = $(e.currentTarget).val();
            store.render();
        });
    },
    createBtn:function()
    {
        $("#btn-create").on("click",function(e){
            e.preventDefault();
            api.postBookmark(construct.getNewBookmark());
            console.log("Create Clicked!");
        });    
    },
    cancelBtn:function()
    {

        $("#btn-cancel").on("click",function(e){
            e.preventDefault();
            store.pageState = "main";
            store.clearInput();
            store.error = false;
            store.render();
            
            console.log("Cancel Clicked!");
        });    
    },
    bookmarkBtn:function()
    {
        $(".bookmark").on("click",function(e){
            e.preventDefault();
            let currentID = store.getID(e);
            let bookmark = store.findBookmarkByID(currentID);
            bookmark.expanded = !bookmark.expanded;
            console.log(store);
            console.log($("#bookmarks-container"));
            store.render();
            
        })    
    },
    newBookmarkUpdate:function()
    {
        $(".add-bookmarks-input").on("input",function(){
            //console.log("test");
            store.newBookmark = construct.getNewBookmark();
            //console.log(store.newBookmark);
        });
    },
    visitBtn:function()
    {
        $('.visit-site').on("click", function(e)
        {
            e.preventDefault();
            let url = $(e.target).attr("value");
            
            
            window.open(url);
        });
    },
    trashBtn:function()
    {
        $('.trash-btn').on("click",function(e){
            e.preventDefault();
            let currentID = store.getID(e);
            api.deleteBookmark(currentID);
            //console.log(currentID);
            store.render();
        })
    },
    ratingSelectorBtn:function()
    {
        $(".star-btn").on("click",function(e){
            e.preventDefault();
            store.ratingSelector = $(e.currentTarget).attr("value");
            console.log(store.ratingSelector);
            store.render();
        });
    }
}