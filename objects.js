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
         var now = new Date().getFullYear();
         this.age = now - this.birthYear;
         return this.age;
     }
 };

 console.log(`John born in ${john.birthYear}, and he is ${john.calcAge(john.birthYear)} years old.`);
 