var text = document.getElementById("text");
text.textContent


//Prototype Attribute of Objects Created With a Constructor Function
function book(title, author, pages, read) {
    this.title = title;
    this.autor = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + ", " + author + ", " + pages + ", " + read;
    }
}

const book1 = new book("Vinetou", "Karl May", "450", "read it twice");
text.textContent = (book1.info());

//Prototype Attribute of Objects Created with new Object () or Object Literal
var userAccount = new Object();
var userAccount = {
    name: "Mike"
}
console.log(userAccount.name);

//The constructor in this example is Object () 
var myObj = new Object();
console.log(myObj.constructor); // Object()
