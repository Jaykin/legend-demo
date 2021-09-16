/*
* 寄生式继承
* */

function createAnother(original) {
    var clone = Object.create(original);

    clone.sayHi = function () {
        alert('Hi,' + clone.name);
    }

    return clone;
}

var person = {
    name: 'Jay',
    friends: ['Vivian', 'Kobe']
}

var anotherPerson = createAnother(person);
anotherPerson.sayHi();      //