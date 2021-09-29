/**
 * Created by Administrator on 2017/1/10.
 */
describe('发布订阅：', function () {
    it('01', function () {
        salesOffices.listen('test01', function (data) {
            console.log('这是数据：' + data);
        });
        //expect(salesOffices.trigger('test01', '测试数据')).to
    });
});