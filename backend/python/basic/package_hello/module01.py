"""
模块
"""


def sayhello(name):
    """ say hello for someone """
    print("this is {} package, Hello, {}".format('pk_name_alias', name))


# 若直接执行该模块，则会命中条件测试
if __name__ == '__main__':
    sayhello('cli')
