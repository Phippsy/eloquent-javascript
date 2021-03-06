switch (parseInt(prompt("Type a number word"))) {
	case 1:
		console.log(1);
		break;
	case 2:
		console.log(2);
	case 3:
		console.log(3);
		break;
	default:
		console.log("default number");
}

// Exercises
	// Triangle printer
	triangle = "#";
	for ( var i = 0; i<7; i++) {
		console.log(triangle);
		triangle += "#";
	}

	// Fizzbuzz
	for ( var i = 1; i<25; i++) {
		j = i
		if ( j % 5 == 0 && j % 3 == 0 ) {
			j = "fizzbuzz";
		} else if ( j % 5 == 0 ) {
			j = "buzz";
		} else if ( j % 3 == 0 ) {
			j = "fizz";
		}
		console.log(j);
	}

	// Chessboard
	function setChar(charStatus) {
		if ( charStatus == true ) {
			return "#";
		} else {
			return " ";
		}	
	}

	function linePrinter(charStatus, lineSize) {
		var linePrint = "";
		for ( var j = 1; j <= lineSize; j++ ) {
		linePrint = linePrint + setChar(charStatus);
		charStatus = !charStatus;
		}
		return linePrint
	}
	
	function boardPrinter(size) {
		var charStatus = true;
		for ( var i = 1; i <= size; i ++ ) {
			console.log(linePrinter(charStatus, size));
			charStatus = !charStatus;
		}	
	}
	

// Function definitions
	greeter() // will not run - greeter is not available yet.

	var greeter = function(name) {
		if (name == undefined) {
			console.log("Hello, stranger");
		} else {
			console.log("Hello " + name);
		}
			
	}

	greeter() // will run - function declarations are not part of the regular top-to-bottom scope of flow control, so the function is immediately available.
	function greeter(name) {
		if (name == undefined) {
			console.log("Hello, stranger");
		} else {
			console.log("Hello " + name);
		}
			
	}

	function example() {
		function a() {} // OK
		if (something) {
			function b() {} // bad - don't declare functions this way within loops / if-else
		}
	}


// Exercises
	// Min function
	function returnMin(num1, num2) {
		if ( num1 > num2 ) {
			return num2;
		} else if ( num2 > num1 ) {
			return num1;
		} else if ( num2 == num1 ) {
			console.log("The numbers are equal");
			return num1;
		} else {
			console.log("Unable to determine smallest number");
		}
	}

	// Determine even numbers
	function isEven(number) {
		if ( number == 0 ) {
			return true;
		} else if ( number == 1 | number == -1 ) {
			return false;
		} else {
			number = Math.sqrt(Math.pow(number, 2));	
			return isEven(number - 2);
		}
	}

	function beanCounter(word) {
		bCount = 0;
		for ( i = 0; i < word.length; i++ ) {
			if ( word[i] == "B" ) {
				bCount ++;
			}
		}
		return bCount;
	}

	function charCounter(word, letter) {
		letterCount = 0;
		for ( i = 0; i<word.length; i++ ) {
			if (word[i] == letter) {
				letterCount ++;
			}
		}
		return letterCount;
	}

		function beanCounter(word) {
			return charCounter(word, "B");
	}


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