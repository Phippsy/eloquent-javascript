
var testObject = {
	one: "One",
	two: "Two",
	three: "Three",
	four: "Four"
}


var testObject2 = {
	one: "One",
	two: "Two",
	three: "Three",
	four: "Four"
}

testObject === testObject2 // false

// Recall that methods can be called using dot notation or bracket notation
var stringy = "hello"
stringy.length // 5
stringy['length'] //5

// Jacques' weresquirrel journal
var journal = [];
function addEntry(events, didITurnIntoASquirrel) {
	journal.push({
		events:events,
		squirrel: didITurnIntoASquirrel
	});
}

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts"], true);

// our formula for phi

function phi(table) {
	return (table[3] * table[0] - table[2] * table[1]) /
	Math.sqrt((table[2] + table[3]) *
		(table[0] + table[1]) *
		(table[1] + table[3]) *
		(table[0] + table[2]))
}
phi([76,9,4,1]) /// 0.06859943405700354, tiny correlation

// require('04_data.js') - see this file for full journal entries

// Determining whether the specified event occurs in the journal

function hasEvent(event, entry) {
	return entry.events.indexOf(event) != -1;
}

// Creating a 4 x 4 table of counts for each event
function tableFor(event, journal) {
	var table = [0,0,0,0];
	for (var i = 0; i < journal.length; i++) {
		var entry = journal[i], index = 0;
		if (hasEvent(event, entry)) index += 1;
		if (entry.squirrel) index += 2;
		table[index] += 1;
	}
	return table;
}

// Storing the values in a MAP, for easy access to corresponding values
var map = {};
function storePhi(event, phi) {
	map[event] = phi;
}

storePhi("pizza", 0.069);
map.pizza // 0.069

// Looping over the properties of an object

for (var event in map) {
	console.log("The correlation for '" + event + "' is " + map[event]);
}

// Final analysis - finding & calculating for all events in the dataset
function gatherCorrelations(journal) {
	var phis = {};
	for (var entry = 0; entry < journal.length; entry++) {
		var events = journal[entry].events;
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			if (!(event in phis))
				phis[event] = phi(tableFor(event, journal));
		}
	}
	return phis;
}

var results = gatherCorrelations(JOURNAL);

// Important object / array methods
push()
shift()
unshift()
lastIndexOf() // starts searching at the end of the array instead of front
slice(1,5) // splits & returns the array elemments from index 1 (inclusive) to 5 (exclusive). If no end index is given, returns all remaining items.
[1,2,3].concat([4,5,6]) // [1,2,3,4,5,6]

// Demonstrating slice and concat
function remove(array, index) {
	return array.slice(0,index).concat(array.slice(index+1))
}

// Strings and their properties
// Strings are immutable - their values cannot be changed
// However, they do have builtins
var stringy = "coconut";
stringy.slice(4,7) // nut
stringy.indexOf("u") // 5
"    hello".trim() // "hello"
stringy.charAt(2) // c

// The arguments object
function argumentCounter() {
	console.log("You gave me " + arguments.length + " arguments.");
}

// The Math object
function randomPointOnCircle(radius) {
	var angle = Math.random() * 2 * Math.PI;
	return {x: radius * Math.cos(angle),
		y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));

// The global object
// the global owner of all variables - window for browsers

// Exercises

// The sum of a range
	// Define a range of numbers
	function range(start, end) {
		var rangeArray = [];
		for (var i=start; i<=end; i++) {
			rangeArray.push(i);
		}
		return rangeArray;
	}

	// Sum an array of numbers
	function sum(array) {
		var results = 0;
		for (var i=0; i<array.length; i++) {
			results += array[i];
		}
		return results;
	}

	// Define a range of numbers with defined stepping
	function stepRange(start, end, step) {
		var rangeArray = [];
		if (step < 0 ) {
			for (var i=start; i>=end; i += step) {
				rangeArray.push(i);
			}
			return rangeArray;	
		}
		for (var i=start; i<=end; i += step) {
			rangeArray.push(i);
		}
		return rangeArray;
	}

// Reverse an array
	function reverseArray(array) {
		var returnArray = [];
		for (var i = 0; i < array.length; i++) {
			returnArray.unshift(array[i]);
		}
		return returnArray;
	}

	function reverseArrayInPlace(array) {
		var swapArray = reverseArray(array);
		for (var i = 0; i < array.length; i++) {
			array[i] = swapArray[i];
		}
	}

// A list
	function arrayToList(array) {
		var iter = 0;
		function listBuild(iter, array) {
			if ( iter >= array.length ) {
				return { value: array[iter], next: null }
			}
			return { value: array[iter], next: listBuild(iter+1, array) }
		}
		return listBuild(iter, array)
	}

	function listToArray(list) {
		var returnArray = [];
		function listFlatten(list, iter) {
			if ( list['next'] === null )  {
			} else {
			iter = iter + 1;
			returnArray[iter-1] = list['value'];
			listFlatten(list['next'], iter)	
			}
		}
		listFlatten(list, 0)
		return returnArray;
	}

	function prepend(element, list) {
		// return a new list with the element added to the front of the list
		return { value: element, next: list };
	}

	function nth(list, num) {
		// return element at position in list or undefined if no such element
		return listToArray(list)[num];
	}

// Deep comparison
	function deepEqual(val1, val2) {
		if (typeof val1 === 'object' && typeof val2 === 'object' && val1 != null && val2 != null) {
			if ( Object.keys(val1).length != Object.keys(val2).length )  {
				return false;
			}
			for (var prop in val1) {
				if (val2.hasOwnProperty(prop)) {
					if (!deepEqual(val1[prop], val2[prop])) {
						return false;
					} 
				} else {
					return false;
				}
			}
			return true;
		} else if (val1 !== val2) {
			return false;
		} else {
			return true;
		}
	}


