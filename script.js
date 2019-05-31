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

//Inheritance in JavaScript
function Plant() {
    this.country = "Mexico";
    this.isOrganic = true;
}

// Add the showNameAndColor method to the Plant prototype property
Plant.prototype.showNameAndColor = function () {
    console.log("I am a " + this.name + " and my color is " + this.color);
}

// Add the amIOrganic method to the Plant prototype property
Plant.prototype.amIOrganic = function () {
    if (this.isOrganic)
        console.log("I am organic, Baby!");
}

function Fruit(fruitName, fruitColor) {
    this.name = fruitName;
    this.color = fruitColor;
}

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of Plant.prototype methods and properties.
Fruit.prototype = new Plant();

// Creates a new object, aBanana, with the Fruit constructor
var aBanana = new Fruit("Banana", "Yellow");

// Here, aBanana uses the name property from the aBanana object prototype, which is Fruit.prototype:
console.log(aBanana.name); // Banana

// Uses the showNameAndColor method from the Fruit object prototype, which is Plant.prototype. The aBanana object inherits all the properties and methods from both the Plant and Fruit functions.
console.log(aBanana.showNameAndColor()); // I am a Banana and my color is yellow.



//Inheritance
let head = {
    glasses: 1
};

let table = {
    pen: 3,
    __proto__: head
};

let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
};

let pockets = {
    money: 2000,
    __proto__: bed
};

console.log(pockets.pen); // 3
console.log(bed.glasses); // 1
console.log(table.money); // undefined




let hamster = {
    stomach: [],

    eat(food) {
        this.stomach.push(food);
    }
};

let speedy = {
    __proto__: hamster,
    stomach: []
};

let lazy = {
    __proto__: hamster,
    stomach: []
};

// Speedy one found the food
speedy.eat("apple");
console.log(speedy.stomach); // apple

// Lazy one's stomach is empty
console.log(lazy.stomach); // <nothing>
