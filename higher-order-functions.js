// Abstracting array traversal

function forEach(array, action) {
	for (var i=0; i<array.length; i++) {
		action(array[i]);
	}
}

// The above function is already available as a method on all arrays
array.forEach(function(item) { 
	// do something 
})

