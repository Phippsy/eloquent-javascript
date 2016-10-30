# Higher-order functions

### Abstracting array traversal

```javascript
function forEach(array, action) {
	for (var i=0; i<array.length; i++) {
		action(array[i]);
	}
}
```
The above function is already available as a method on all arrays

```javascript
array.forEach(function(item) { 
	// do something 
})
```

Higher-order functions operate on other functions - either by taking them as arguments or by returning a function.

#### Functions that create new functions

```javascript
function greaterThan(n) {
	return function(m) { return m > n };
}

var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); // true
```
#### Functions that change other functions

```javascript
function noisy(f) {
	return function(arg) {
		console.log("Calling with", arg);
		var val = f(arg);
		console.log("called with ", arg, "- got", val);
		return val;
	};
}

noisy(Boolean)(0);
// calling with 0
// called with 0 - got false

#### Functions that provide new types of control flow

```javascript

function unless(test, then) {
	if (!test) then();
}

function repeat(times, body) {
	for (var i=0; i<times; i++) {
		body(i);
	}
}

repeat(3, function(n) {
	unless(n % 2, function() {
		console.log(n + " is even")
	});
})

#### Passing along arguments - apply

Apply - pass an array or array-like object and it will call the function with those arguments.

```javascript
var testarray = [1,2,3];
console.log.apply(null, testarray)
// 1
// 2
// 3

// Making a wrapping to provide the null argument by default

function transparentWrapping(f) {
	return function() {
		return f.apply(null, arguments);
	}
}

var consoleApply = transparentWrapping(console.log);
consoleApply(testarray);
// 1
// 2
// 3
```

## JSON

Example JSON from the book

```JSON
[
  {"name": "Emma de Milliano", "sex": "f",
   "born": 1876, "died": 1956,
   "father": "Petrus de Milliano",
   "mother": "Sophia van Damme"},
  {"name": "Carolus Haverbeke", "sex": "m",
   "born": 1832, "died": 1905,
   "father": "Carel Haverbeke",
   "mother": "Maria van Brussel"},
  … and so on
]
```

#### Stringify and parse

```javascript
var stringed = JSON.stringify({name: "Donal", age: "38"});
console.log(stringed) // {"name": "Donal", "age": "38"}
var parsed = JSON.parse(stringed);
console.log(parsed) // Object {name: "Donal", age: "38"}
```
#### Filtering an array

Load in the ANCESTRY_FILE from http://eloquentjavascript.net/code/ancestry.js.

```javascript
var ancestry = JSON.parse(ANCESTRY_FILE);

function filter(array, test) {
	var passed = [];
	for (var i=0; i<array.length; i++) {
		if (test(array[i]))
			passed.push(array[i]);
	}
	return passed;
}

console.log(filter(ancestry, function(person) {
	return person.born > 1900 && person.born < 1925;
}));
// name: "Philibert Haverbeke", ...
```

As with forEach, filter is available as a standard method on all arrays / objects.

```javascript
ancestry.filter(function(person) {
	return person.born > 1900;
})
```

#### Transforming with map

Applies a function to all of an array's elements and returns a new array with the transformed values.

```javascript
function map(array, transform) {
	var mapped = [];
	for (var i=0; i<array.length; i++) {
		mapped.push(transform(array[i]));
	}
	return mapped;	
}

var overNinety = ancestry.filter(function(person) {
	return person.died - person.born > 90;
});

console.log(map(overNinety, function(person) {
	return person.name;
}));

// 'Clara', 'Emile', 'Maria'
```

Of course, yet again, map is a standard method available on arrays.


```javascript
ancestry.map(function(person) {
	return person.name;
});
```

#### Summarising with reduce

i.e. calculating summary statistics / values.
The parameters to the reduce function are:

- The array
- A combining function
- The starting value

```javascript
function reduce(array, combine, start) {
	var current = start;
	for (var i=0; i<array.length; i++) {
		current = combine(current, array[i]);
	}
	return current;
}

console.log(reduce([1,2,3,4], function(a,b) {
	return a + b;
}, 0))
```

Finding the oldest ancestor using reduce (if the array has more than 1 element, you can skip the start value - the method will take the first found value as start and then apply the combine function to it and all future values).

```javascript
console.log(ancestry.reduce(function(min, cur) {
	if (cur.born < min.born) return cur;
	else return min;
}));

### Composability

Higher-order functions come into their own when you have to compose functions.

```javascript
function average(array) {
	function plus(a,b) {
		return a + b;
	}
	return array.reduce(plus) / array.length;
}

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));
console.log(average(ancestry.filter(female).map(age)));
```

#### Tracking direct ancestors

```javascript
var byName = {};
ancestry.forEach(function(person) {
	byName[person.name] = person;
}); 
```

Now each item in the byName object is referenced using the person's name, e.g. `byName['Martin Haverbeke']`.

```javascript
function reduceAncestors(person, f, defaultValue) {
	function valueFor(person) {
		if (person==null)
			return defaultValue;
		else
			return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
	}
	return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
	if (person.name == "Pauwels van Haverbeke")
		return 1;
	else
		return (fromMother + fromFather) / 2;
}

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
```

Calculating the % of a person's known ancestors who lived past 70.

```javascript
function countAncestors(person, test) {
	function combine(current, fromMother, fromFather) {
		var thisOneCounts = current != person && test(current);
		return fromMother + fromFather + (thisOneCounts ? 1 : 0);
	}
	return reduceAncestors(person, combine, 0);
}

function longLivingPercentage(person) {
	var all = countAncestors(person, function(person) {
		return true;
	});
	var longLiving = countAncestors(person, function(person) {
		return (person.died - person.born) >= 70;
	});
	return longLiving / all;
}
```

### Binding

The bind method is a method of a function which calls it with certain arguments fixed.