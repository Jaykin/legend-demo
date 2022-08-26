#!/usr/bin/env python3

"""
文件写入
"""

file_path = 'files/file_message.txt'

"""
'w' 模式写入
- 如果你要写入的文件不存在，函数 open() 将自动创建它
- 会先清理已存在的文件内容
"""
with open(file_path, 'w') as f:
    f.write('I love python~\n')
    f.write('I love creating new games~\n')


"""
'a' 模式写入
- 如果你要写入的文件不存在，函数 open() 将自动创建它
- 不会清理已存在的文件内容，写入到文件的行都将添加到文件末尾
"""
with open(file_path, 'a') as f:
    f.write('I love python too~\n')
    f.write('I love creating new games too~\n')
