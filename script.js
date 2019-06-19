var text = document.getElementById('text');
text.textContent;

//Prototype Attribute of Objects Created With a Constructor Function
function book(title, author, pages, read) {
	this.title = title;
	this.autor = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return title + ', ' + author + ', ' + pages + ', ' + read;
	};
}

const book1 = new book('Vinetou', 'Karl May', '450', 'read it twice');
text.textContent = book1.info();

//Prototype Attribute of Objects Created with new Object () or Object Literal
var userAccount = new Object();
var userAccount = {
	name: 'Mike'
};
console.log(userAccount.name);

//The constructor in this example is Object ()
var myObj = new Object();
console.log(myObj.constructor); // Object()

//Inheritance in JavaScript
function Plant() {
	this.country = 'Mexico';
	this.isOrganic = true;
}

// Add the showNameAndColor method to the Plant prototype property
Plant.prototype.showNameAndColor = function() {
	console.log('I am a ' + this.name + ' and my color is ' + this.color);
};

// Add the amIOrganic method to the Plant prototype property
Plant.prototype.amIOrganic = function() {
	if (this.isOrganic) console.log('I am organic, Baby!');
};

function Fruit(fruitName, fruitColor) {
	this.name = fruitName;
	this.color = fruitColor;
}

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of Plant.prototype methods and properties.
Fruit.prototype = new Plant();

// Creates a new object, aBanana, with the Fruit constructor
var aBanana = new Fruit('Banana', 'Yellow');

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
speedy.eat('apple');
console.log(speedy.stomach); // apple

// Lazy one's stomach is empty
console.log(lazy.stomach); // <nothing>

function Student() {}

Student.prototype.sayName = function() {
	console.log(this.name);
};

function EighthGrader(name) {
	this.name = name;
	this.grade = 8;
}

EighthGrader.prototype = Object.create(Student.prototype);

const carl = new EighthGrader('carl');
carl.sayName(); // console.logs "carl"
carl.grade; // 8

const person = {
	isHuman: false,
	printIntroduction: function() {
		console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
	}
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

//Factory Function

const personFactory = (name, age) => {
	const sayHello = () => console.log('hello!');
	return { name, age, sayHello };
};

const jeff = personFactory('jeff', 27);

console.log(jeff.name); // 'jeff'

jeff.sayHello(); // calls the function and logs 'hello!'

//for reference, here is the same thing created using the Constructor pattern:
const Person = function(name, age) {
	this.sayHello = () => console.log('hello!');
	this.name = name;
	this.age = age;
};

const jeff = new Person('jeff', 27);

// name = undefined
var scope1 = function () {
  // name = undefined
  var scope2 = function () {
    // name = undefined
    var scope3 = function () {
      var name = 'Todd'; // locally scoped
    };
  };
};

//Closure

var sayHello = function(name) {
	var text = 'Hello, ' + name;
	return function() {
		console.log(text);
	};
};

sayHello('Todd'); // nothing happens, no errors, just silence...

var helloTodd = sayHello('Todd');
helloTodd(); // will call the closure and log 'Hello, Todd'

sayHello('Bob')(); // calls the returned function without assignment

//Scope and ‘this’
var myFunction = function() {
	console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function() {
	console.log(this); // this = Object { myObject }
};

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function() {
	console.log(this); // this = <nav> element
};
nav.addEventListener('click', toggleNav, false);

//This and that
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function() {
	var that = this;
	console.log(that); // <nav> element
	setTimeout(function() {
		console.log(that); // <nav> element
	}, 1000);
};
nav.addEventListener('click', toggleNav, false);


//Changing scope with .call(), .apply() and .bind()

var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
	console.log(this); // [object Window]
}

var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
	(function() {
		console.log(this);
	}.call(links[i]));
}

nav.addEventListener(
	'click',
	function() {
		toggleNav(arg1, arg2);
	},
	false
);

//nav.addEventListener('click', toggleNav.bind(scope, arg1, arg2), false);

//Private and Public Scope

(function() {
	var myFunction = function() {
		// do some stuff here
	};
})();

myFunction(); // Uncaught ReferenceError: myFunction is not defined

// define module
var Module = (function() {
	return {
		myMethod: function() {
			console.log('myMethod has been called.');
		}
	};
})();

// call module + methods
Module.myMethod();

// define module
var Module = (function() {
	return {
		myMethod: function() {},
		someOtherMethod: function() {}
	};
})();

// call module + methods
Module.myMethod();
Module.someOtherMethod();

var Module = (function() {
	var privateMethod = function() {};
	return {
		publicMethod: function() {
			// has access to `privateMethod`, we can call it:
			// privateMethod();
		}
	};
})();

//an example of returning an Object, making use of public and private methods:
var Module = (function() {
	var myModule = {};
	var privateMethod = function() {};
	myModule.publicMethod = function() {};
	myModule.anotherPublicMethod = function() {};
	return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();

//Private Variables and Functions
const FactoryFunction = (string) => {
	const capitalizeString = () => string.toUpperCase(); //private function
	const printString = () => console.log(`----${capitalizeString()}----`); //public function
	return { printString };
};

const taco = FactoryFunction('taco');

//printString(); // ERROR!!
//capitalizeString(); // ERROR!!
//taco.capitalizeString(); // ERROR!!
taco.printString(); // this prints "----TACO----"

//The big deal here is that even though we can’t access the capitalizeString() function, printString() can. That is closure.

const counterCreator = () => {
	let count = 0;
	return () => {
		console.log(count);
		count++;
	};
};

const counter = counterCreator();

counter(); // 0
counter(); // 1
counter(); // 2
counter(); // 3

