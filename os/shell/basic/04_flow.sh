#!/bin/bash

# 流程控制
a=10
b=20

# -------------- if --------------
echo "-------------- if --------------"
if [ $a != $b ]; then echo true; fi

# -------------- if else --------------
echo "-------------- if else --------------"
if [ $a == $b ]
then
    echo "a 等于 b"
    echo "a = b"
else
    echo "a 不等于 b"
    echo "a != b"
fi

# -------------- if else-if else --------------
echo "-------------- if else-if else --------------"
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi

# -------------- case --------------
echo "-------------- case --------------"
echo '输入 1 到 4 之间的数字:'
aNum=3
echo '你输入的数字为:'
echo $aNum
# read aNum
case $aNum in
    1|2|3)  echo "你选择了 $aNum"
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac

# -------------- for 循环 --------------
echo "-------------- for 循环 --------------"
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

# -------------- while 循环 --------------
echo "-------------- while 循环 --------------"
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done

# 用户交互
# echo '按下 <CTRL-D> 退出'
# echo -n '输入你最喜欢的网站名: '
# while read FILM
# do
#     echo "是的！$FILM 是一个好网站"
# done

# -------------- until 循环 --------------
echo "-------------- until 循环 --------------"
a=0
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done