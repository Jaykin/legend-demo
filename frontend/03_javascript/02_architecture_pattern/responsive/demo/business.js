const reactive = require('../reactive');

const obj = reactive({
    a: {
        aa: {
            aaa: 123,
            bbb: [
                1,
                {
                    cccc: 2
                },
                [4, 5, 6]
            ],
            ccc: {
                dddd: 1
            }
        },
        bb: 'bb'
    },
    b: 2
});

// obj.$watch('a.aa.aaa', (newVal, oldVal) => {
//     console.log('aaa changed', newVal, oldVal);
// });
obj.$watch('a.aa', (newVal, oldVal) => {
    console.log('aa changed', newVal, oldVal);
});

obj.a.aa = 44;
// obj.a.aa.aaa = 55;


// obj.$watch('a.aa.bbb.1.cccc', (newVal, oldVal) => {
//     console.log('cccc changed', newVal, oldVal);
// });
// obj.a.aa.bbb[1].cccc = 444;


// 数组
// obj.$watch('a.aa.bbb', (newVal, oldVal) => {
//     console.log('bbb changed', newVal, oldVal);
// });
// obj.a.aa.bbb[2].push(34);


