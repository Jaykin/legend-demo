"""
单元测试 - 测试函数
"""

import unittest
from city_funcs import format_city


class CitiesTestCase(unittest.TestCase):
    """继承测试类"""

    # 调用测试方法之前执行
    def setUp(self):
        print('调用测试方法之前，会执行 setup~')

    # 调用测试方法之后执行
    def tearDown(self):
        print('调用测试方法之后，会执行 tearDown~')

    def test_city_country(self):
        formatted_city = format_city('hunan', 'china')
        # 调用断言方法
        self.assertEqual(formatted_city, 'China, Hunan')

if __name__ == '__main__':
    unittest.main()
