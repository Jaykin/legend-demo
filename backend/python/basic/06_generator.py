"""
生成器

生成器函数
    - 包含 yield 语句的函数，调用将返回一个生成器对象
    - 执行流程：每次调用 next() 的时候执行，遇到 yield 语句返回，再次执行时从上次返回的 yield 语句处继续执行
"""

# 通过推导式创建
g1 = (x * x for x in range(10))
print(type(g1))     # generator
for n in g1:
    print(n)


# 通过生成器函数创建
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield 2
    print('step 3')
    yield 3


g2 = odd()
for n in g2:
    print(n)


def fib(max_num):
    num, a, b = 0, 0, 1
    while num < max_num:
        # yield b
        print(b)
        a, b = b, a + b
        num = num + 1
    return 'done'


fib(12)

