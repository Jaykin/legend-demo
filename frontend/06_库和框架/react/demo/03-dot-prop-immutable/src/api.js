


    /**
     *
     * API学习
     * */

    var dotProp = require('dot-prop-immutable');
    var state = {
        A: {
            A_a: ['A_a-a', 'A_a-b'],
            A_b: {
                'A_b-a': 'A_b-a',
                'A_b-b': 'A_b-b'
            }
        },
        B: {
            B_a: ['B_a-a', 'B_a-b'],
            B_b: {
                'B_b-a': 'B_b-a',
                'B_b-b': 'B_b-b'
            }
        },
        C: {
            'C.a': 'C.a',
            'C_b': true,
            'C_c': null,
            'C_d': {
                'C_d-a': 'hello'
            }
        }
    }


    //01 get ===================================================

    console.log(dotProp.get(state, 'A.A_a'));       // [ 'A_a-a', 'A_a-b' ]
    console.log(dotProp.get(state, 'A.A_b.A_b-a')); // A_b-a
        // 注意1：点路径中的.需要转义
    console.log(dotProp.get(state, 'C.C\\.a'));     // C.a
        // 注意2：路径可以是数组形式（即最终会拼接数组为点路径）
    console.log(dotProp.get(state, ['C', 'C.a']));  // C.a
    console.log(dotProp.get(state, ['B', 'B_b', 'B_b-a'])); // B_b-a
    console.log(dotProp.get(state, ['B.B_b', 'B_b-a']));    // undefined
        // 注意3：可以使用数组下标和特殊字符作为路径
    console.log(dotProp.get(state, 'A.A_a.0'));     // A_a-a
    console.log(dotProp.get(state, 'A.A_a.$end'));  // A_a-b

    //02 set ===================================================
        // 注意1：一般用法
    var state01 = dotProp.set(state, 'C.C_b', { 'C_b-b': 'C_b-b' });
    var state02 = dotProp.set(state01, 'C.C_b-b', 'changed');
    console.log(state01 == state);      // false
    console.log(state01 == state02);      // false
        // 注意2：使用函数来修改属性值（oldVal默认是{}--如果没有该属性的话）
                // 路径描述同上
    var state03 = dotProp.set(state, 'C.C\\a', oldVal => oldVal + ' new');
    console.log(state03);

    //03 delete ===================================================
    console.log('delete=====================');

    var state04 = dotProp.delete(state, 'B.B_c');
    console.log(state04 === state);         // false

    //04 toggle ===================================================
    console.log('toggle----------------');

    var state05 = dotProp.toggle(state, 'C.C_b');
    var state06 = dotProp.toggle(state05, 'C.C_c');
    var state07 = dotProp.toggle(state06, 'C.C_d');
    console.log(state07);


    //05 merge ===================================================