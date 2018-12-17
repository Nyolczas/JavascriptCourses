/*************************
 * Objects and properties
 */

 var john = {
     firstName: 'John',
     lastName: 'Smith',
     birthYear: 1990,
     family: ['Jane', 'Mark', 'Bob', 'Emily'],
     job: 'teacher',
     isMarried: false,
     calcAge: function() {
         this.age = 2018 - this.birthYear;
     }
 };

 console.log(john.calcAge(1990));
 