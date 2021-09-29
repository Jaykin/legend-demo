#!/bin/bash

echo "Shell 传递参数实例！";
echo "第一个参数为：$1";

echo "参数个数为：$#";
echo "传递的参数作为一个字符串显示：$* ";

# 命令行调用：sh ./02_param.sh 1 2 3
echo "-- \"\$*\" 演示 ---"
for i in "$*"; do
    echo $i
done
# 输出 1 个值
# 1 2 3

echo "-- \"\$@\" 演示 ---"
for i in "$@"; do
    echo $i
done
# 输出 3 个值
# 1
# 2
# 3