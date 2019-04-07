#!/usr/bin/env python3
import pickle

# 打开文件
file = open('/Users/ming/Desktop/workspace/github/python-demo/basic/05_file/tmp.txt', 'r')
# 读取文件内容
str = file.read()
print(str)
# 关闭文件
file.close()



data1 = {
    'a': [1, 2.0, 3, 4+6j],
    'b': ('string', u'Unicode string'),
    'c': None}
output = open('05_file/data.pkl', 'wb')
pickle.dump(data1, output)
output.close()