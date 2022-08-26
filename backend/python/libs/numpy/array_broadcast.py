#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/13 17:02
@Desc   : 广播：用来描述了 numpy 如何在算术运算期间处理具有不同形状的数组
"""
import numpy as np

'''
数组与标量运算
'''
a = np.array([1.0, 2.0, 3.0])
b = 2.0
print(a * b)  # [2. 4. 6.]

'''
数组与数组运算
- 从尾部（右）开始，一直往左，逐元素（element-by-element）的比较其形状（元素可能是 ndarray）
- 若 形状是相等的 or 其中一个的shape为1(即只有一个元素)，则认为数组的形状是兼容的
- 否则会报错：ValueError: operands could not be broadcast together
'''
aa = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])  # shape: (2, 2, 3)

# 其中一个的shape为1
bb = np.array([[[[1]]]])  # shape: (1, 1, 1, 1)
print(aa * bb)
'''
[[1 4]
 [3 8]]
'''

# 形状是相等的
cc = np.array([[1, 2, 3], [3, 4, 5]])  # shape: (2, 3)
print(aa * cc)

# ValueError
dd = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])  # shape: (2, 2, 2)
# print(aa * dd)   # ValueError: operands could not be broadcast together with shapes (2,2,3) (2,2,2)


# Example：实现外积（outer product）
aaa = np.array([0.0, 10.0, 20.0, 30.0])
bbb = np.array([1.0, 2.0, 3.0])
ccc = aaa[:, np.newaxis]  # [[0.], [10.], [20.], [30.]]、shape: (4, 1)
print(ccc + bbb)  # shape: (4, 3)
'''
[[ 1.  2.  3.]
 [11. 12. 13.]
 [21. 22. 23.]
 [31. 32. 33.]]
'''

'''
Example：VQ（Vector Quantization）矢量量化

VQ jargon（行话）
- codes：在一组点中找到去给定的点最近的点
- observation：给定的点
'''
print('=' * 20, ' VQ ', '=' * 20)
observation = np.array([111.0, 188.0])  # 数字代表：weight、height
codes = np.array([[102.0, 203.0],
                  [132.0, 193.0],
                  [45.0, 155.0],
                  [57.0, 173.0]])       # shape: (4, 2)
diff = codes - observation
print(diff ** 2)
'''
[[  81.  225.]
 [ 441.   25.]
 [4356. 1089.]
 [2916.  225.]]
'''
print(np.sum(diff ** 2, axis=1))    # 平方并对轴1求和：[ 306.  466. 5445. 3141.]
dist = np.sqrt(np.sum(diff ** 2, axis=1))   # 求当前点到目标点的距离 dist = √(x² + y²)
print(dist)                         # 开平方，[17.49285568 21.58703314 73.79024326 56.04462508]
print(np.argmin(dist))              # 取最小值的索引，0
