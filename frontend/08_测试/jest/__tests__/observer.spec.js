/**
 * Created by Administrator on 2017/1/20.
 */
import event from '../src/assets/observer';

describe('test Event', () => {
    let temp = 1;
    event.listen('test.test01', (data) => {
        temp += data;
    });

    it('Event-trigger', () => {
        event.trigger('test.test01', 2);
        expect(temp).toBe(3);
    });

    it('Event-remove', () => {
        event.remove('test.test01');
        event.trigger('test.test01', 2);
        expect(temp).toBe(3);
    });

    it('Event-this', () => {
        let _this = this;
        let arrowThis = null;
        let funcThis = null;
        let obj = {
            testArrowThis: () => {
                arrowThis = this;   // 箭头函数的this
            },
            testFuncThis: function () {
                funcThis = this;    // 普通函数的this
            }
        };

        event.listen('test.this', obj.testArrowThis);
        event.listen('test.this', obj.testFuncThis);
        event.trigger('test.this');
        expect(arrowThis === _this).toBeTruthy();
        expect(funcThis === event).toBeTruthy();
    });
})