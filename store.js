import construct from "./construct.js";
import api from "./api.js";
import events from "./events.js";
export default  {
    bookmarks: [
      {
        id: 'x56w',
        title: 'Google',
        rating: 4,
        url: 'http://google.com',
        desc: 'lorem ipsum dolor sit',
        expanded: false
      }  
      
    ],
    error: 0,
    errorMessage:"",
    pageState:"main",
    ratingSelector:0,
    filter:0,
    newBookmark:{
        title:"",
        url:"",
        desc:"",
        rating:""
    },

    getBookmarks:function(bookmarkArry = this.bookmarks)
    {
        return construct.bookmarks(bookmarkArry);
    },
    updateBookmarks:function(bookmarkArry)
    {
        this.bookmarks = bookmarkArry;
        this.render(); 
    },
    getID:function(e)
    {
        return $(e.currentTarget).closest(".bookmark").attr("id");  
    },
    findBookmarkByID(id)
    {
        //console.log(id);
        return this.bookmarks.find(function(bookmark){
            //console.log(bookmark);
            return bookmark.id == id;

        })
    },
    render:function()
    {//Render Function
    //store.updateBookmarks();
        switch(this.pageState)
        {
            case "main":
            {
                //Generate main page
                $('main').html(construct.mainPage());
                events.addNewBookmarkBtn();
                events.bookmarkBtn();
                events.filterSelect();
                events.trashBtn();
                events.visitBtn();
                //Filter Change Event
                break;
            }
            case "add-bookmark":
            {
                //Load page
                $('main').html(construct.submitPage());
                events.ratingSelectorBtn();
                events.cancelBtn();
                events.createBtn();
                events.newBookmarkUpdate();
                //Create button handler
                //Cancel button handler
                //Error popup handler
                break;
            }
            
        }
        //console.log(this.bookmarks);
        
    },
    init:function()
    {
        api.getBookmarks();
    },
    clearInput:function()
    {
        this.newBookmark = {
            title:"",
            url:"",
            desc:"",
            rating:""
        };
    }

  };