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
/*
const Person = function(name, age) {
	this.sayHello = () => console.log('hello!');
	this.name = name;
	this.age = age;
};

const jeff = new Person('jeff', 27);
*/

// name = undefined
var scope1 = function() {
	// name = undefined
	var scope2 = function() {
		// name = undefined
		var scope3 = function() {
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

//Back to Factory Functions

const Player = (name, level) => {
	let health = level * 2;
	const getLevel = () => level;
	const getName = () => name;
	const die = () => {
		// uh oh
	};
	const damage = (x) => {
		health -= x;
		if (health <= 0) {
			die();
		}
	};
	const attack = (enemy) => {
		if (level < enemy.getLevel()) {
			damage(1);
			console.log(`${enemy.getName()} has damaged ${name}`);
		}
		if (level >= enemy.getLevel()) {
			enemy.damage(1);
			console.log(`${name} has damaged ${enemy.getName()}`);
		}
	};
	return { attack, damage, getLevel, getName };
};

const jimmie = Player('jim', 10);
const badGuy = Player('jeff', 5);
jimmie.attack(badGuy);

//Inheritance with Factories

const Person = (name) => {
	const sayName = () => console.log(`my name is ${name}`);
	return { sayName };
};

const Nerd = (name) => {
	// simply create a person and pull out the sayName function!
	const { sayName } = Person(name);
	const doSomethingNerdy = () => console.log('nerd stuff');
	return { sayName, doSomethingNerdy };
};

const jess = Nerd('jess');

jess.sayName(); //my name is jess
jess.doSomethingNerdy(); // nerd stuff

//factory
const proto = {
	hello() {
		return `Hello, my name is ${this.name}`;
	}
};

const greeter = (name) =>
	Object.assign(Object.create(proto), {
		name
	});

const george = greeter('george');

const msg = george.hello();

console.log(msg);

//The Module Pattern
const calculator = (() => {
	const add = (a, b) => a + b;
	const sub = (a, b) => a - b;
	const mul = (a, b) => a * b;
	const div = (a, b) => a / b;
	return {
		add,
		sub,
		mul,
		div
	};
})();

//The concept is simple.. write a function, wrap it in parentheses and then immediately call the function by adding () to the end of it.

calculator.add(3, 5); // 8
calculator.sub(6, 2); // 4
calculator.mul(14, 5534); // 77476

//Classes

class User {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		console.log(this.name);
	}
}

let user = new User('John');
user.sayHi();

//Class Expression

let User = class {
	sayHi() {
		alert('Hello');
	}
};

//Getters/setters, other shorthands

class User {
	constructor(name) {
		// invokes the setter
		this.name = name;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		if (value.length < 4) {
			alert('Name is too short.');
			return;
		}
		this._name = value;
	}
}

let user = new User('John');
alert(user.name); // John

user = new User(''); // Name too short.

class User {
	name = 'Anonymous';

	sayHi() {
		alert(`Hello, ${this.name}!`);
	}
}

new User().sayHi();


class MyClass {
	prop = value; // field
  
	constructor(...) { // constructor
	  // ...
	}
  
	method(...) {} // method
  
	get something(...) {} // getter method
	set something(...) {} // setter method
  
	[Symbol.iterator]() {} // method with computed name/symbol name
	// ...
  }


  //Class timer

  class Clock {
    constructor({ template }) {
      this.template = template;
    }
  
    render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
  }
  
  
  let clock = new Clock({template: 'h:m:s'});
  clock.start();


//SINGLE RESPONSIBILITY PRINCIPLE

//Instead of this

function is_game_over() {

	// game over logic goes here!
  
	if (gameOver){
	  const gameOverDiv = document.createElement('div')
	  gameOverDiv.classList.add('game-over')
   gameOverDiv.textContent = `${this.winner} won the game!`
	  document.body.appendChild(gameOverDiv)
	}
  }

  //Extract all the DOM manipulation into it’s own module and use it like so:

  function is_game_over() {

	// game over logic goes here!
  
	if (gameOver){
	  DOMStuff.gameOver(this.winner)
	}
  }

//SINGLE RESPONSIBILITY PRINCIPLE
const areaCalculator = (s) => {
  const proto = {
    sum() {
      // logic to sum
    },
    output () {
     return `
       <h1>
         Sum of the areas of provided shapes:
         ${this.sum()} 
       </h1>
    }
  }
  return Object.assign(Object.create(proto), {shapes: s})
}

const shapes = [
  circle(2),
  square(5),
  square(6)
]
const areas  = areaCalculator(shapes)
const output = sumCalculatorOputter(areas)
console.log(output.JSON())
console.log(output.HAML())
console.log(output.HTML())
console.log(output.JADE())

