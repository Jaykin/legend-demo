"""
函数
- 每个函数都应只负责一项具体的工作
"""


# 定义
def func01(name, age=18):
    """
    函数文档字符串 - 用于描述函数功能
    """
    print("Hello, {} 岁的 {}!".format(age, name))
    return


func01('Jay', 20)  # 传入参数的顺序需跟函数定义时一致
func01(age=20, name='Jay')  # 传入的参数若跟函数定义时不一致，则需要指定参数名


# 不定长参数 - 元组、字典
def func02(name, *role_tuple_args, **info_dict_kwargs):
    print("Name: " + str(name))
    print("Roles: " + str(role_tuple_args))
    print("Other Infos: " + str(info_dict_kwargs))


"""
Positional Argument: 'Jay', 1, 2, 3
keyword Argument: a=1, b=2
"""
# func02()            # TypeError: func02() missing 1 required positional argument: 'name'
func02('Jay')
func02('Jay', 1, 2, 3, a=1, b=2)


# 匿名函数 - lambda
def func03_bi(arg1, arg2, bi_func):
    return bi_func(arg1, arg2)


arg_four = 4
print(func03_bi(1, 2, lambda arg1, arg2: arg1 + arg2 + arg_four))


# 返回多个值 - 其实返回的是 tuple
def move(x, y, step):
    nx = x + step
    ny = y - step
    return nx, ny


mx, my = move(20, 30, 5)
print(mx, my)
print(type(move(20, 30, 5)))    # <class 'tuple'>
