/**
 * Created by Administrator on 2017/2/3.
 */

test('mock function', () => {
    const foo = () => {
        console.log('hehh');
    }
    const myMock = jest.fn(foo);
    console.log(myMock);

    // myMock.mock.calls
    myMock();
    expect(myMock.mock.calls.length).toBe(1);
    // myMock.mock.instances
    let o = new myMock();
    expect(myMock.mock.instances[1]).toBe(o);


    const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar)
    console.log(mockFn);

    console.log(jest.fn());

});