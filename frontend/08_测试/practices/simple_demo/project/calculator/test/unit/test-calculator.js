/**
 * Unit For Calculator
*/

const expect = require('chai').expect;
const calculator  = require('../../lib/calculator');

describe('unit test for calculator', () => {
    // 模拟点击操作
    const mockClick = (char, state = calculator.initialState) => (
        char
        ? mockClick(char.slice(1), calculator.nextState(state, char[0]))
        : state
    )

    // 01 - 初始状态是否正常
    it('01 - 正确展示初始状态', () => {
        const target = calculator.initialState;

        expect(target).property('display', '0');
        expect(target).property('isInitStatus', true);
    });

    // 02 - 初始状态下点击运算符状态不变
    it('02 - 初始状态下点击操作符状态不变 +', () => {
        expect(mockClick('+')).property('display', '0');
        expect(mockClick('+')).property('isInitStatus', true);
    });

    // 03 - 初始状态下点击多次数字
    it('03 - 初始状态下点击多次数字 12', () => {
        expect(mockClick('12')).property('display', '12');
        expect(mockClick('12')).property('isInitStatus', false);
    });

    // 04 - 算式01
    it('04 - 算式01 12+', () => {
        expect(mockClick('12+').display).equal('12+');
    });

    // 05 - 算式02
    it('05 - 算式02 12+-', () => {
        expect(mockClick('12+-').display).equal('12+');
    });

    // 06 - 算式03 12+-23
    it('06 - 算式03 12+-23', () => {
        expect(mockClick('12+-23').display).equal('12+23');
    });

    // 07 - 算式04 12+23-
    it('07 - 算式04 12+23-', () => {
        expect(mockClick('12+23-').display).equal('35-');
    });

    // 08 - 算式05 12+23=
    it('08 - 算式05 12+23=', () => {
        const target = mockClick('12+23=');

        expect(target.display).equal(35);
        expect(target.isInitStatus).equal(true);
    });

    // 09 - 算式06 12+23=6
    it('09 - 算式06 12+23=6', () => {
        const target = mockClick('12+23=6');

        expect(target.display).equal('6');
        expect(target.isInitStatus).equal(false);
    });

    // 10 - 算式07 12+23=-
    it('10 - 算式07 12+23=-', () => {
        const target = mockClick('12+23=-');
        
        expect(target.display).equal('35-');
        expect(target.isInitStatus).equal(false);
    });

    // 11 - 算式08 12+23=-6
    it('11 - 算式08 12+23=-6', () => {
        expect(mockClick('12+23=-6').display).equal('35-6');
    });

    // 12 - 算式09 12+23=-6=
    it('12 - 算式09 12+23=-6=', () => {
        expect(mockClick('12+23=-6=').display).equal(29);
    });
})