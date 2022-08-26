"""
函数式编程（functional programing）
1、变量可指向函数（hoc）
2、函数可作为实参（hoc）
3、函数可作为返回值（hoc）
4、匿名函数（lambda）
5、装饰器（decorator）
6、偏函数（partial function）
"""
import datetime
import functools
from functools import reduce

print(type(abs))  # <class 'builtin_function_or_method'>

# ============================== 1、变量可指向函数 ==============================
f_abs = abs
print(type(f_abs))  # <class 'builtin_function_or_method'>
print(f_abs(-10))  # 10


# ============================== 2、函数可作为实参 ==============================
def add(x, y, f):
    return f(x) + f(y)


print(add(-5, 6, abs))      # 11


# map - 将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回
def f_map(x):
    return x * x


print(list(map(f_map, [1, 2, 3, 4, 5])))    # [1, 4, 9, 16, 25]


# reduce - 把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce 把结果继续和序列的下一个元素做累积计算
def f_reduce(x, y):
    return x + y


print(reduce(f_reduce, [1, 3, 5, 7, 9]))    # 25


# ============================== 3、函数可作为返回值 ==============================
def lazy_sum(*args):
    """ 闭包（Closure） """
    def f_sum():
        ax = 0
        for n in args:
            ax += n
        return ax
    return f_sum


print(lazy_sum(1, 2, 3))    # <function lazy_sum.<locals>.f_sum at 0x105e14a60>
print(lazy_sum(1, 2, 3)())  # 6


fuck = 0


def inc():
    x = 0

    def fn():
        # 闭包修改外部作用域中的变量时需要先声明
        nonlocal x      # 变量属于嵌套作用域
        global fuck     # 变量属于全局作用域

        x += 1
        fuck += 2
        return x
    return fn


f = inc()
print(f(), fuck)  # 1 2
print(f(), fuck)  # 2 4


# ============================== 4、匿名函数（lambda） ==============================
# lambda 的函数体只能是表达式
m = map(lambda x: x + x, [1, 2, 3, 4])
print(list(m))      # [2, 4, 6, 8]


# ============================== 5、装饰器（decorator） ==============================
# 是在代码运行期间动态为函数增加功能的方式
# decorator 本质是一个返回函数的高阶函数
def log(prefix='jay'):
    print('from log: {}'.format(prefix))

    def decorator(func):
        @functools.wraps(func)  # 修改新函数的名称为旧函数（__name__）
        def wrapper(*args, **kw):
            print('[{}] call {}()'.format(prefix, func.__name__))
            return func(*args, **kw)

        return wrapper
    return decorator


@log('com.jay.www')
def now():
    print(datetime.datetime.now())
# now = log()(now)    # 相当于 @log()
now()


# ============================== 6、偏函数（partial function） ==============================
# 可把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数就会更简单
# 当函数的参数个数太多，需要简化时使用
# 工具包：functools.partial
int2 = functools.partial(int, base=2)
print(int2('11'))           # 3
print(int2('11', base=10))  # 11

