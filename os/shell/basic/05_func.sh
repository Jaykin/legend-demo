#!/bin/bash

# 函数

function func1() {
    echo "func1"
}

func2() {
    echo "func2 调用"
    echo "传参个数 $#"
    echo "所有传参 $*"
    return 254
}

echo "-----函数开始执行-----"
func2 1 2 3
echo "-----函数执行完毕, 返回了 $?-----"
echo "'$? 已经变化为：' $?-----"