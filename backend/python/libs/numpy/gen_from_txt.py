#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/14 20:25
@Desc   : genfromtxt
"""
import numpy as np
from io import StringIO

'''
genfromtxt 函数
- 用来根据表格数据创建数组
'''

'''
定义输入
. 一个字符串：本地 or 远程文件的名称 or file-like对象
. 一串字符串：每个字符串被视为文件中的一行
. 一个生成器：每个字符串被视为文件中的一行

远程文件：会自动下载到当前目录并打开
可识别文件类型是文本文件 or 档案（gzip/bz2）
'''

'''
解析文件
- 分行：会将每个【非空行】分割为一串字符串
- 分列：
    - delimiter：指定分隔符，默认是空白区域
    - 
'''

# ================================= delimiter =================================
data_01 = u'1,2,3\n4,5,6'
print(np.genfromtxt(StringIO(data_01), delimiter=','))  # 指定分隔符为 ,
'''
[[1. 2. 3.]
 [4. 5. 6.]]
'''

data_02 = u'  1  2  3\n  4  5 67\n890123  4'
print(np.genfromtxt(StringIO(data_02), delimiter=3))  # 每3个字符为一列
'''
[[  1.   2.   3.]
 [  4.   5.  67.]
 [890. 123.   4.]]
'''

data_03 = u'123456789\n   4  7 9\n   4567 9'
print(np.genfromtxt(StringIO(data_03), delimiter=(4, 3, 2)))  # 指定每列的字符数
'''
[[1234.  567.   89.]
 [   4.    7.    9.]
 [   4.  567.    9.]]
'''

# ================================= autostrip =================================
data_04 = u'1, abc , 2\n 3, xxx, 4'
print(np.genfromtxt(StringIO(data_04), delimiter=',', dtype='U5'))  # without strip
'''
[['1' ' abc ' ' 2']
 ['3' ' xxx' ' 4']]
'''
print(np.genfromtxt(StringIO(data_04), delimiter=',', dtype='U5', autostrip=True))  # with strip
'''
[['1' 'abc' '2']
 ['3' 'xxx' '4']]
'''

# ================================= comments：用于定义标记注释开始的字符串 =================================
# 默认为：#
data_05 = u"""#
# Skip me !
# Skip me too !
1, 2
3, 4
5, 6 #This is the third line of the data
7, 8
# And here comes the last line
9, 0
"""
print(np.genfromtxt(StringIO(data_05), delimiter=',', comments='#'))
'''
[[1. 2.]
 [3. 4.]
 [5. 6.]
 [7. 8.]
 [9. 0.]]
'''

# ================================= skip_header/skip_footer：指定跳过文件头or尾部的行数 =================================
data_06 = u"\n".join(str(i) for i in range(10))
print('未跳过: ', np.genfromtxt(StringIO(data_06)))  # [0. 1. 2. 3. 4. 5. 6. 7. 8. 9.]
print('跳过：', np.genfromtxt(StringIO(data_06), skip_header=3, skip_footer=5))  # [3. 4.]

# ================================= names：为列指定名称 =================================
data_07 = u"1 2 3\n4 5 6"
print('names_01：', np.genfromtxt(StringIO(data_07), names='a, b, c'))  # 指定名称
print('names_02：', np.genfromtxt(StringIO(data_07), names=True))  # (4., 5., 6.)
'''
使用数据内的名称：名字将从第一行（在skip_header之后）被读取，即使该行被注释掉
'''

# ================================= usecols：指定要选择的列索引 =================================
data_08 = u"1 2 3\n4 5 6"
print(np.genfromtxt(StringIO(data_08), usecols=(0, -1)))
'''
[[1. 3.]
 [4. 6.]]
'''
print(np.genfromtxt(StringIO(data_08), names='a, b, c', usecols=('a', 'c')))
'''
[(1., 3.) (4., 6.)]
'''

# ================================= converters：自定义转换逻辑(转换器) =================================
data_09 = u"1, 2.3%, 45.\n6, 78.9%, 0"
print(np.genfromtxt(StringIO(data_09), delimiter=',', names=('i', 'p', 'n')))  # [(1., nan, 45.) (6., nan,  0.)]

convertfunc = lambda x: float(x.strip(b'%')) / 100.
print(np.genfromtxt(StringIO(data_09), delimiter=',', names=('i', 'p', 'n'),
                    converters={1: convertfunc}))  # [(1., 0.023, 45.) (6., 0.789,  0.)]

'''
缺失值（missing_values）和填充值（filling_values）

缺失值
- 默认任何空字符串都被标记为缺失
- 单个字符串或逗号分隔的字符串：该字符串将用作所有列缺失数据的标记
- 字符串序列：在这种情况下，每个项目都按顺序与列关联
- 字典类型：字典的值是字符串或字符串序列。相应的键可以是列索引（整数）或列名称（字符串）

填充值
- 单个值：这将是所有列的默认值
- 字符串序列：每个条目都是相应列的默认值
- 字典类型：每个键可以是列索引或列名称，并且相应的值应该是单个对象。我们可以使用特殊键None为所有列定义默认值。
'''
data_10 = u"N/A, 2, 3\n4, ,???"
print(np.genfromtxt(
    StringIO(data_10),
    delimiter=',',
    dtype=int,
    names='a,b,c',
    missing_values={0: 'N/A', 'b': ' ', 2: '???'},
    filling_values={0: 0, 'b': 0, 2: -999}
))      # [(0, 2, 3) (4, 0, -999)]


# ================================= 基于 genfromtxt 封装的其他函数 =================================
# np.recfromtxt()
# np.recfromcsv()
