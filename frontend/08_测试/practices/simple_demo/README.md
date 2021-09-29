## 前端测试学习说明

### 参考
- [http://web.jobbole.com/91123/](http://web.jobbole.com/91123/)

### 准备工作
- express  开启web服务
- mocha  测试框架
- chai  断言库
- selenium-webdriver、chromedriver  浏览器驱动，用于e2e测试
- jsdom  mock DOM，用于集成测试
- promise-retry  重试处理，主要用于e2e测试
- babel  JS编译
- React  前端开发框架

### 项目目录
- _utils  相应工具学习代码
- mocha  mocha学习代码
- project  完整测试项目代码
### 编写测试
- 单元测试（Unit）
- 集成测试（Integration）
- 端到端测试（E2E）

### 遇到的问题
1. 测试中异步处理的时间较久，导致mocha测试用例超时（默认2S），从而不通过
	- 解决：设置mocha的超时时间

### 总结
大致熟悉了前端测试的基本流程，待后续再加强认知