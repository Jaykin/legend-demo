#!/usr/bin/env python3

'''
基本数据类型
Number、String、List(列表)、Tuple(元组)、Set(集合)、Dictionary(字典)
无布尔类型，用 False 和 True 俩关键字表示
'''

# 1、Number
print(5 + 4)            # 加法
print(5.3 - 2)          # 减法
print(3 * 7)            # 乘法
print(2 / 4)            # 除法，得到一个浮点数
print(2 // 4)           # 除法，得到一个整数
print(17 % 3)           # 取余
print(2 ** 5)           # 乘方

# 2、String
str = 'Runoob'
str1 = "Runoob"

print(str)              # 输出字符串
print(str[0])           # 输出第一个字符
print(str[1:-2])        # 输出第一个 到 倒数第二个 的所有字符
print(str[2:])          # 输出第二个开始的后面的所有字符
print(str * 2)          # 输出字符串两次
print(str + '你好')      # 连接字符串
print('hello\nJay')     # 使用反斜杠转义字符
print(r'hello\nJay')    # 原始字符串(r/R) - 使反斜杠无法转义
print('R' in str)       # 成员运算 - 若字符串包含指定字符则返回 True，否则 False
print('R' not in str)   # 成员运算 - 若字符串不包含指定字符则返回 True，否则 False
print('i am %s, im %d years old!' % ('Jay', 18))    # 字符串格式化 - i am Jay, im 18 years old!

# 3、List
    # 3.1、创建列表
list1 = [1, 2, 3]       # 访问用
    # 3.2、访问列表的值
print(list1[0])         # 1
print(list1[1:2])       # [2]
    # 3.3、更新列表
list2 = [1, 2, 3]       # 更新用
list2[1:2] = [4]        # list2: [1, 4, 3]
list2[0] = 6            # list2: [6, 4, 3]
list2.append(5)         # list2: [6, 4, 3, 5]
list2.append([7, 8])    # list2: [6, 4, 3, 5, [7, 8]]
list2.extend([9, 10])   # list2: [6, 4, 3, 5, [7, 8], 9, 10]
    # 3.4、删除列表元素
list3 = [1, 2, 3]       # 删除用
del list3[1:2]          # list3: [1, 3]
list3.remove(3)         # list3: [1]
list3.remove(3)         # 报错 ValueError: list.remove(x): x not in list
list3.clear()           # list3: []
    # 3.5、列表运算符
list4 = [1, 2, 3]       # 运算符用
print(len(list4))       # 3，获取列表长度
print([1, 2] + [3, 4])  # [1, 2, 3, 4]，组合
print([1] * 4)          # [1, 1, 1, 1]，重复
print(1 in [1])         # True，元素是否存在列表中
print(1 not in [1])     # False，元素是否不存在列表中
    # 3.5、列表截取和拼接
list5 = [1, 2, 3]
print(list5[1:])        # [2, 3]
print(list5 + [4, 5])   # [1, 2, 3, 4, 5]
list5 += [6, 7]         # list5: [1, 2, 3, 6, 7]
    # 3.6、嵌套列表
list6 = [1, [2, 3], 4, [5, 6]]
print(list6[1][0])      # 2

# 4、Tuple，使用同 List

# 5、Set
