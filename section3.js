// Lecture: Hoisting

// functions
var currentYear = new Date().getFullYear();
calculateAge(1975);

function calculateAge(year) {
    console.log(currentYear - year);
}

// retirement(1956);
var retirement = function(year) {
    console.log(65 - (currentYear - year));
}


// variables

console.log(age);
var age = 23;

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);