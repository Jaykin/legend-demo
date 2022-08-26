#!/usr/bin/env python3
# coding=UTF-8

"""
基本数据类型
Number、String、List(列表)、Tuple(元组)、Set(集合)、Dictionary(字典)
无布尔类型，用 False 和 True 俩关键字表示
"""
import math

# 1、数字 - 不可变
print(type(2))          # int 整数
print(type(2 / 4))      # float 浮点数
print(type(4 + 3j))     # complex 复数
print(type(complex(1, 2)))
print(type(2) == int)   # True
print(isinstance(2, int))   # True

print(5 + 4)            # 加法    9
print(0.2 + 0.1)        # 0.30000000000000004
print(5.3 - 2)          # 减法    3.3
print(3 * 7)            # 乘法    21
print(2 / 4)            # 除法，得到一个浮点数    0.5
print(2 // 4)           # 除法，得到一个整数     0
print(17 % 3)           # 取余   2
print(2 ** 5)           # 乘方（2的5次方）   32

print(abs(-10))         # 10

print(math.pi)          # 3.141592653589793
print(math.e)           # 2.718281828459045

# 2、字符串 - 不可变
type('string')          # <class 'str'>

str1 = 'Jay '             # 单引号
str2 = "Jay "             # 双引号
print(str1 == str2)       # True

print(str1)              # 输出字符串
print(str1[0])           # 截取 - 第一个字符
print(str1[-2])          # 截取 - 倒数第二个字符    y
print(str1[1:-2])        # 截取 - 第一个 到 倒数第二个 的所有字符
print(str1[2:])          # 截取 - 第二个开始的后面的所有字符
print(str1[0:5:2])       # 截取 - 0为头下标，5为尾下标，2为步长  Jy
print(str1 * 2)          # 输出字符串两次  Jay Jay
print(str1 + '你好')      # 连接字符串
print('hello\nJay')      # 使用反斜杠转义字符
print(r'hello\nJay')     # 原始字符串(r/R) - 使反斜杠无法转义    hello\nJay
print('R' in str1)       # 成员运算 - 若字符串包含指定字符则返回 True，否则 False
print('R' not in str1)   # 成员运算 - 若字符串不包含指定字符则返回 True，否则 False
print('i am %s, im %d years old!' % ('Jay', 18))    # 字符串格式化 - i am Jay, im 18 years old!

"iJJH".index('JJ')        # 内置函数 - 查找指定字符串的下标值     1

"jay chou".title()        # 'Jay Chou'
"Jay Chou".lower()        # 'jay chou'
"jay chou".upper()        # 'JAY CHOU'

" python ".lstrip()         # 'python '
" python ".rstrip()         # ' python'
" python ".strip()          # 'python'

# 格式化字符串
print('{}网址： "{}!"'.format('菜鸟教程', 'www.runoob.com'))    # 菜鸟教程网址： "www.runoob.com!”
print('{1} 和 {0}'.format('Google', 'Runoob'))                # Runoob 和 Google
print('{name}网址： {site}'.format(name='菜鸟教程', site='www.runoob.com'))    # 菜鸟教程网址： www.runoob.com
print('常量 PI 的值近似为： {!r}。'.format(math.pi))            # 常量 PI 的值近似为： 3.141592653589793。
print('常量 PI 的值近似为 {0:.3f}。'.format(math.pi))           # 常量 PI 的值近似为 3.142。
print('{0:10} ==> {1:10d}'.format('Taobao', 3))               # Taobao     ==>          3

# 3、列表 List - 元素可修改
print(type([1, 'str', True]))   # list

list1 = [1, 2, 3]
print(list1[0])         # 访问    1
print(list1[1:2])       # 访问    [2]

list2 = [1, 2, 3]
list2[1:2] = [4]        # 更新    list2: [1, 4, 3]
list2[0] = 6            # 更新    list2: [6, 4, 3]
list2.append(5)         # 更新    list2: [6, 4, 3, 5]
list2.append([7, 8])    # 更新    list2: [6, 4, 3, 5, [7, 8]]
list2.extend([9, 10])   # 更新    list2: [6, 4, 3, 5, [7, 8], 9, 10]

list3 = [1, 2, 3]
del list3[1:2]          # 删除    list3: [1, 3]
list3.remove(3)         # 删除    list3: [1]
list3.remove(3)         # 删除    报错 ValueError: list.remove(x): x not in list
list3.clear()           # 删除    list3: []

list4 = [1, 2, 3]
print(len(list4))       # 获取列表长度    3
print([1, 2] + [3, 4])  # 连接    [1, 2, 3, 4]
print([1] * 4)          # 重复    [1, 1, 1, 1]
print(1 in [1])         # 元素是否存在列表中     True
print(1 not in [1])     # 元素是否不存在列表中    False

list5 = [1, 2, 3]
print(list5[1:])        # 截取    [2, 3]
print(list5 + [4, 5])   # 拼接    [1, 2, 3, 4, 5]
list5 += [6, 7]         # 拼接    list5: [1, 2, 3, 6, 7]

list6 = [1, [2, 3], 4, [5, 6]]
print(list6[1][0])      # 嵌套    2

list7 = ['bmw', 'audi', 'toyota', 'subaru']
# list7.sort(reverse=True)  # 排序
print(sorted(list7))        # 排序
print(list7)

list8 = ['bmw', 'audi', 'toyota', 'subaru']
for item8 in list8:         # 遍历
    print(item8)

list9 = [val for val in range(1, 11)]  # 列表解析/列表推导
print(list9)    # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


# 4、元组 Tuple - 元素不可修改
print(type((1, 'str', False)))  # tuple

tup1 = ()
tup2 = (1,)
tup3 = (1, 2, 3)
tup4 = 1, 2, 3
tup5 = tuple(range(1, 3))


# 5、集合 Set - 无序不重复元素的集
print(type({1, 'str', True}))   # set

set1 = {}
set2 = {1}
set3 = {1, 2}
set4 = set(range(1, 3))


# 6、字典 Dictionary - 无序的 键(key) : 值(value) 的集合
print(type({'a': 1, 'b': 'str'}))    # dict

dict1 = {'a': 1, 'b': 'str'}
dict2 = dict(a=1, b='str', c=False)
print(dict2['a'])               # 读
dict2['d'] = 3                  # 写
# del dict2['b']                  # 删
for key, val in dict1.items():  # 遍历 - 键值对
    print(key, val)
for k in dict1.keys():          # 遍历 - 键
    print(k)
for val in dict1.values():        # 遍历 - 值
    print(val)

# 7、range
print(type(range(1, 4)))        # range
print(type(range(1, 12, 2)))    # range

