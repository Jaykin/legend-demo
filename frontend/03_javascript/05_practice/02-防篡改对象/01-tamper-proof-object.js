

    /*
    *
    * 防篡改对象
    *
    * */

        // 1.0 不可扩展对象
           // 默认情况下
    var person = { name: 'Jay' }
    person.age = 25;
    console.log(Object.isExtensible(person));       // true
            // 设置为不可扩展对象
    Object.preventExtensions(person);
    person.job = 'FEE';             // 属性添加不成功
    console.log(Object.isExtensible(person));       // false


        // 2.0 密封的对象
    var people = { name: 'Vivian'}
    console.log(Object.isExtensible(people))        // true
    console.log(Object.isSealed(people));           // false
            // 设置为密封对象
    Object.seal(people);
    console.log(Object.isExtensible(people))        // false
    console.log(Object.isSealed(people));           // true
    delete people.name;                             // 删除失败



        // 3.0 冻结的对象
    var theone = { name: 'Tuan' }
    console.log(Object.isExtensible(theone))        // true
    console.log(Object.isSealed(theone));           // false
    console.log(Object.isFrozen(theone));           // false
            // 设置为冻结对象
    Object.freeze(theone);
    console.log(Object.isExtensible(theone))        // false
    console.log(Object.isSealed(theone));           // true
    console.log(Object.isFrozen(theone));           // true