/** 
 * 用来创建模型的对象（ES6版本）
*/

// 模型的超类
class Model {
    
}

// 模型类
class User extends Model {

}

// 创建模型实例
const user = new User({});


console.dir(Model);
console.dir(User);
console.log('user', user);

