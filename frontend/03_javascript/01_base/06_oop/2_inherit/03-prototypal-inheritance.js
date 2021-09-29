/*
* 原型式继承
* */
    // 1.0
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: 'none',
    friend: ['none']
}

var anotherPerson = object(person);
anotherPerson.name = 'Jay';
anotherPerson.friend.push('Vivian');

var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Vivian';
anotherPerson.friend.push('Jay');

console.log(person.friend);         // ['none', 'Vivian', 'Jay']



    // 2.0 ES5
var person01 = Object.create(person, {
    name: {
        value: 'Kobe',
        writable: false
    }
})