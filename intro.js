console.log("hello world");
var test = "Peter" || true;
console.log(test);
console.log("Test one\nTest two on line two\tFollowed by a tab, motherfucker!")

// Type coercion
console.log("----Type coercion----")
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)

// when null or undefined occurs on either side of the operator, it produces true only if both sides are one of null or undefined.
console.log(null == undefined);
// → true
console.log(null == 0);

// Falsey values
console.log(false == "" && false == 0)

// Function foolery
function greeter(name) {
	greetName = name || "nameless one"; // understanding conditional OR
	if ( greetName.indexOf("Donal") != -1 ) { // understanding indexOf
		greetName = "Glorious leader"
	}
	console.log("Greetings, " + greetName);
}
