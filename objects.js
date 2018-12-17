/*************************
 * Objects and properties
 */

 var john = {
     firstName: 'John',
     lastName: 'Smith',
     birthYear: 1990,
     family: ['Jane', 'Mark', 'Bob', 'Emily'],
     job: 'teacher',
     isMarried: false
 }

 console.log(john);
 console.log(john.firstName);
 console.log(john['lastName']);

 john.job = 'designer';
 john['isMarried'] = true;
 console.log(john);

 var jane = new Object();
 jane.firstName = 'Jane';
 jane.birthYear = '1969';
 jane['lastname'] = 'Smith';
 console.log(jane);