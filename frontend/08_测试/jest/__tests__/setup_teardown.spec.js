
// 测试运行前 和 运行后 要执行的动作

beforeEach(() => {
    console.log('beforeEach');
});

afterEach(() => {
    console.log('afterEach');
});

beforeAll(() => {
    console.log('beforeAll');
});
afterAll(() => {
    console.log('afterAll');
});

test('001', () => {
    expect(1).toBe(1);
});

test('002', () => {
    expect(2).toBe(2);
});


describe('scope', () => {
    beforeEach(() => {
        console.log('beforeEach::002');
    });

    afterEach(() => {
        console.log('afterEach::002');
    });

    beforeAll(() => {
        console.log('beforeAll::002');
    });
    afterAll(() => {
        console.log('afterAll::002');
    });

    test('003', () => {
        expect(3).toBe(3);
    });

    test('004', () => {
        expect(4).toBe(4);
    });
});


