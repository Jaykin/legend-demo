# shell

## 概述
>操作系统中提供给用户与内核（真正控制计算机硬件的东西）进行沟通的接口，分为 `图形 shell`、`命令行 shell`
* 即是一种脚本编程语言，也是一个连接用户和内核的软件
* shell 主要用来开发一些实用的、自动化的工具，而不是用来开发具有复杂业务逻辑的应用
* 命令行 shell
  * `windows` cmd、powerShell
  * `linux` bash(默认)
  
## 特殊字符
### 1、引号
* `'` 单引号，完全引用
* `"` 双引号，不完全引用
* ` 反引号，执行命令，或者使用 $()

### 2、括号

## 基本使用
### 1、指定解释程序
>`#!` 指令（`Sha-Bang`）告诉系统其后的路径所指的程序即是解释此脚本文件的 shell 程序
* `#!/bin/bash` 
* `#!/usr/bin/env xxx`

### 2、运行脚本
* 作为可执行程序
  * 命令行中执行 `./test.sh`
  * 需要指定解释程序，需要有可执行权限，会产生子进程，不会影响当前进程
* 作为解释器参数
  * 直接运行解释器，其参数就是 shell 脚本的文件名
  * `sh ./test.sh`
  * 不要指定解释程序，若指定，会被当成注释，会产生子进程，不会影响当前进程
* `source` 命令执行
  * `source ./test.sh` or `. ./test.sh`
  * 在当前进程运行，不会产生新的子进程
### 3、变量
#### 3.1 变量定义和赋值
```bash
# 显式赋值
var_name='hello'
# 语句赋值 1，
for file1 in `ls /etc`
# 语句赋值 2
for file2 in $(ls /etc)
# 定义只读变量
var_name2='world'
readonly var_name2
```
* 变量名和等号之间不能有空格
* 变量可以被重新定义和赋值
* 用 `readonly` 命令可以将变量定义为只读的，重新赋值时会报错
* 命名规则
  * 只能使用 `英文字母`、`数字`、`下划线`，首字母不能是数字
  * 不能使用关键字（help 命令查看）

#### 3.2 使用变量
```bash
var_name='hello'
echo $var_name
# 这种方式能更好的定义变量边界
echo "${var_name}world"
```
* 在变量名前加 `$` 符号，有两种方式

#### 3.3 删除变量
```bash
var_name='jay'
unset var_name  # 使用 unset 命令删除变量
echo var_name   # 输出为空
```

#### 3.4 变量类型
* `局部变量` 在脚本或命令中定义，仅在当前 shell 实例中有效
* `环境变量` 所有的程序都能访问的变量，shell 脚本可以定义环境变量，如：`$PATH`
* `shell 变量` 是有 shell 程序设置的特殊变量，一部分是局部变量，一部分是环境变量
  * 默认可使用的环境变量 http://c.biancheng.net/view/2938.html

### 4、数据类型
#### 4.1 字符串
```bash
name='Jay'
# 单引号拼接
greeting_1='hello, '$name' !'   # hello, jay !
greeting_2='hello, ${name} !'   # hello, ${name} !
# 双引号拼接
greeting_3="hello, "$name" !"   # hello, jay !
greeting_4="hello, ${name} !"   # hello, jay !

# 获取字符串长度
echo ${#name} # 3

# 提取子字符串
string="runoob is a great site"
echo ${string:1:4}  # 输出 unoo，指定索引即可，会截取 [1, 4)

# 查找子字符串
echo `expr index "$string" io`  # 输出 4，查找 i 或 o 的位置，哪个字母先出现就返回哪个的索引值
```
* `单引号` 单引号内的字符会原样输出，其中使用变量是无效的；其中不能出现单个单引号，不能出现转义字符，可成对出现（用于字符串拼接）
* `双引号` 可以使用变量；可以出现转义字符

#### 4.2 数组
```bash
# 定义数组 数组名=(值1 值2 ... 值n))
array1=(1 2 "string")
array1[0]="1"

# 读取数组 ${数组名[下标]}
echo $array1    # 1，相当于 ${array1[0]}
echo ${array1[1]} # 2
echo ${array1[@]} # 输出数组所有元素
echo ${array1[*]} # 输出数组所有元素

# 获取数组元素个数
echo ${#array1[@]}  # 3
echo ${#array1[*]}  # 3

# 获取单个元素的长度
echo ${#array1[2]}  # 6
```
* 仅支持一维数组（即数组不可嵌套），未限定数组的大小
* 获取数组元素需要使用下标，下标可以是整数或表达式，其值应该 >= 0

### 5、注释
```bash
# 这是单行注释

:<<EOF
这是一个多行注释
EOF

:<<'
这是另一个多行注释
'

:<<!
这又是一个多行注释
!
```

### 6、传递参数
>可以在执行 shell 脚本时，向脚本传递参数，脚本获取的格式为 `$n`，n 是一个数字，代表第几个参数    

参数处理|说明
---|:--:
`$0`|执行的文件名
`$n`|参数的值
`$#`|参数的个数
`$*`|以一个单字符串显示所有向脚本传递的参数，若以 "$*" 使用，则以 "$1 $2 ... $n" 的形式输出
`$$`|脚本运行的当前进程 ID
`$!`|后台运行的最后一个进程的ID号
`$@`|以一个单字符串显示所有向脚本传递的参数，若以 "$@" 使用，则以 "\$1" "\$2" ... "\$n" 的形式输出
`$-`|显示 Shell 使用的当前选项，与 `set 命令` 功能相同
`$?`|显示最后命令的退出状态，0表示没有错误，其他任何值表明有错误

### 7、运算符
>支持 `算数运算符`、`关系运算符`、`布尔运算符`、`字符串运算符`、`文件测试运算符`   
#### 7.1 算数运算
>原生 bash 不支持简单的数学运算，需要借助 `expr` 命令(表达式计算工具) or `awk` 命令
* 表达式必须包含在反引号之间
* 表达式和运算符之间要有空格
* 使用 expr 时，乘法运算符需要转义
* 在 Mac 中，expr 的语法是 `$(表达式)`，乘法运算符不需要转义
* 条件表达式需要放在 `[]` 之中，并且要有空格

运算符|说明|示例
---|:--:|:--:
`+`|加法|\`expr $a + $b\`
`-`|减法|\`expr $a - $b\`
`*`|乘法|\`expr $a \\\* $b\`
`/`|除法|\`expr $a / $b\`
`%`|取余|\`expr $a % $b\`
`=`|赋值|a=$b 将变量 b 的值赋给 a
`==`|相等,比较数字|[ $a == $b ] 相等返回 true，不等返回 false
`!=`|不相等,比较数字|[ $a != $b ] 不等返回 true，相等返回 false

#### 7.2 关系运算
>关系运算符只支持数字，不支持字符串，除非字符串的值是数字    

运算符|说明|示例
---|:--:|:--:
`-eq`|检测两个数是否相等，相等返回 true|[ $a -eq $b ]
`-ne`|检测两个数是否不相等，不相等返回 true|[ $a -ne $b ]
`-gt`|检测左边的数是否大于右边的，如果是，则返回 true|[ $a -gt $b ]
`-lt`|检测左边的数是否小于右边的，如果是，则返回 true|[ $a -lt $b ]
`-ge`|检测左边的数是否大于等于右边的，如果是，则返回 true|[ $a -ge $b ]
`-le`|检测左边的数是否小于等于右边的，如果是，则返回 true|[ $a -le $b ]

#### 7.3 布尔运算
运算符|说明|示例
---|:--:|:--:
`!`|非运算，表达式为 true 则返回 false，否则返回 true|[ ! false ]
`-o`|或运算，有一个表达式为 true 则返回 true|[ $a -lt 20 -o $b -gt 100 ]
`-a`|与运算，两个表达式都为 true 才返回 true|[ $a -lt 20 -a $b -gt 100 ] 

#### 7.4 逻辑运算
>注意逻辑表达式需要包含在 `[[]]` 中

运算符|说明|示例
---|:--:|:--:
`&&|`逻辑的 AND|[[ $a -lt 100 && $b -gt 100 ]]
`||`|逻辑的 OR|[[ $a -lt 100 || $b -gt 100 ]] 

#### 7.5 字符串运算
运算符|说明|示例
---|:--:|:--:
`=`|检测两个字符串是否相等，相等返回 true|[ $a = $b ] 
`!=`|检测两个字符串是否相等，不相等返回 true|[ $a != $b ] 
`-z`|检测字符串长度是否为0，为0返回 true|[ -z $a ]
`-n`|检测字符串长度是否为0，不为0返回 true|[ -n "$a" ] 
`$`|检测字符串是否为空，不为空返回 true|[ $a ] 

#### 7.6 文件测试运算
>用于检测文件的各种属性，以下为不完全统计

运算符|说明|示例
---|:--:|:--:
`-d`|检测文件是否是目录，如果是，则返回 true|[ -d $file ] 
`-r`|检测文件是否可读，如果是，则返回 true|[ -r $file ] 
`-w`|检测文件是否可写，如果是，则返回 true|[ -w $file ] 
`-x`|检测文件是否可执行，如果是，则返回 true|[ -x $file ]
`-s`|检测文件是否为空（文件大小是否大于0），不为空返回 true|[ -s $file ]
`-e`|检测文件（包括目录）是否存在，如果是，则返回 true|[ -e $file ] 
`-L`|检测文件是否存在并且是一个符号链接(软链接),如果是，则返回 true|[ -L $file ]

### 8、常用命令
#### 概述
* `内置命令` 即 shell 自身的，不需要创建子进程，对当前 shell 生效（如：cd）
* `外部命令` 即其他应用程序，一个程序就是一个命令，会创建子进程
#### 8.1 echo
>用于字符串的输出   
```bash
# 显示普通字符串
echo "normal str"

# 显示转义字符
echo "\"escape str\""

# 显示变量
name="jay"
echo "My Name Is $name"

# 原样输出字符串，不进行转义或取变量（用单引号即可）
echo 'My Name Is $name'

# 换行
echo -e "First Line \n";    # -e 开启转义 \n 换行
echo "Second Line";

# 不换行
echo -e "First Line \c"     # -e 开启转义 \c 不换行
echo "Second Line"

# 显示结果定向至文件，> 文件路径
echo "It is a test file" > './testFile.txt'

# 显示命令执行结果，使用反引号
echo `date`
echo `expr 20 - 10`

# 输出带效果
# 字颜色：30—–37 字背景颜色范围：40—–47 
echo -e "\033[30m 黑色字 \033[0m"
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[32m 绿色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[34m 蓝色字 \033[0m"
echo -e "\033[35m 紫色字 \033[0m"
echo -e "\033[36m 天蓝字 \033[0m"
echo -e "\033[37m 白色字 \033[0m"

echo -e "\033[40;37m 黑底白字 \033[0m"
echo -e "\033[41;37m 红底白字 \033[0m"
echo -e "\033[42;37m 绿底白字 \033[0m"
echo -e "\033[43;37m 黄底白字 \033[0m"
echo -e "\033[44;37m 蓝底白字 \033[0m"
echo -e "\033[45;37m 紫底白字 \033[0m"
echo -e "\033[46;37m 天蓝底白字 \033[0m"
echo -e "\033[47;30m 白底黑字 \033[0m"

# 其他控制项
# \33[0m 关闭所有属性 
# \33[1m 设置高亮度 
# \33[4m 下划线 
# \33[5m 闪烁 
# \33[7m 反显 
# \33[8m 消隐 
# \33[30m — \33[37m 设置前景色 
# \33[40m — \33[47m 设置背景色 
# \33[nA 光标上移n行 
# \33[nB 光标下移n行 
# \33[nC 光标右移n行 
# \33[nD 光标左移n行 
# \33[y;xH设置光标位置 
# \33[2J 清屏 
# \33[K 清除从光标到行尾的内容 
# \33[s 保存光标位置 
# \33[u 恢复光标位置 
# \33[?25l 隐藏光标 
# \33[?25h 显示光标
```

#### 8.2 printf
>提供更丰富的输出
```text
// 语法
printf format-string(格式控制字符串) [arguments...](参数列表)
```
* 格式替代符
  * `%s` 替代字符串，如：`printf "%-10s"`，`-` 表示左对齐，没有则右对齐，`10` 表示至少 10 个字符，不够则空格填充，超出则全显示
  * `%c` 替代单个字符
  * `%d` 替代整数
  * `%f` 替代浮点数，如：`printf "%-4.2f"`，`.2` 表示保留 2 位小数
* 规则
  * 单引号 和 双引号效果一样，没有引号也可以输出
  * 如果没有 arguments，那么 %s 用 null 替代，%d 用 0 替代

#### 8.3 test
>用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试
```bash
# 数值测试
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi

# 字符串测试
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi

# 文件测试
if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi
```

#### 8.4 read
>从标准输入中读取用户的输入，并赋值给变量
```bash
read name
echo $name
```

#### 8.5 grep
>Globally search a Regular Expression and Print，是一种强大的文本搜索工具，它能使用特定模式匹配（包括正则表达式）搜索文本，并默认输出匹配行

#### 8.6 exit
>退出

#### 8.7 cat
>查看文件内容 `cat <file_path>`

#### 8.8 expr
>表达式计算工具 `expr $a + $b`

#### 8.9 awk
>文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理

#### 8.10 sed
>非交互流式文本编辑器，可以对文本文件进行增、删、改、查等操作，支持按行、按字段、按正则匹配文本内容，灵活方便，特别适合于大文件的编辑

#### 8.11 exit
>退出当前 shell 进程，并返回一个退出状态，使用 `$?` 可以接收这个状态，一般 0 表示成功，非 0 表示失败

#### 8.12 curl
>创建网络请求

### 9、流程控制
* `if`
  ```text
  // 分行写
  if contition
  then
    command1
    command2
    ...
    commandN
  fi

  // 一行需要加 ; 断句
  if contition; then command1; command2; fi
  ```
* `if else`
  ```text
  if contition
  then
    command1
    command2
    ...
    commandN
  else
    command
  fi
  ```
* `if else-if else`
  ```text
  if condition1
  then
    command1
  elif condition2 
  then 
    command2
  else
    commandN
  fi
  ```
* `case`
  * `esac` 为结束标记，即 case 反过来
  * 每个 case 分支用右圆括号，两个分号表示 break
  * 可匹配一个值或一个模式（如：或 | ）
  ```text
  case 值 in
  模式1)
    command1
    command2
    ...
    commandN
    ;;
  模式2）
    command1
    command2
    ...
    commandN
    ;;
  esac
  ```
  ```bash
  aNum=2
  case $aNum in
    1|2|3)  echo "你选择了 $aNum"
    ;;
    1)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
  esac
  ```
* `for 循环`
  ```text
  // 分行
  for var in item1 item2 ... itemN
  do
    command1
    command2
    ...
    commandN
  done

  // 单行
  for var in item1 item2 ... itemN; do command1; command2… done;
  ```
  ```bash
  for (( i=1; i<=4; i++))
  do
      echo "$i"
  done
  ```
* `while 循环`
  ```text
  while condition
  do
    command
  done
  ```
* `无限循环`
  ```bash
  # for
  for (( ; ; ))

  # while
  while :
  do
    echo "forever"
  done

  while true
  do
    echo "forever"
  done
  ```
* `until 循环`
  ```text
  until condition
  do
    command
  done
  ```
* 跳出循环
  * `break` 跳出整个循环
  * `continue` 跳出本次循环

### 10、函数
1. `函数定义`
```text
[ function ] funname [()] {
    action;
    [return int;]
}
```
  * 可以带 function func() 定义，也可直接 func() 定义
  * 可以加 return 返回，若不加的话，将以最后一条命令的运行结果作为返回值
  * 返回值必须是[0,255]的数值，在函数调用后，通过 `$?` 获得；其仅对其上一条指令负责
2. `函数调用` 
  * 直接使用函数名进行调用
  * 所有函数在使用前必须先定义
3. `函数参数` 
  * 函数调用传参，当获取第十个及以后的参数时，需要使用 `${n}`
  ```bash
  func() {
      echo $1
      echo $2
  }

  # 传参
  func 1 2
  ```
  * 特殊参数
  
参数处理|说明
---|:--:
`$n`|传入的第 n 个参数，适合 10 个以下的
`${n}`|传入的第 n 个参数，适合 10 个及以上的
`$#`|参数的个数
`$*`|以一个单字符串显示所有向脚本传递的参数，若以 "$*" 使用，则以 "$1 $2 ... $n" 的形式输出
`$@`|以一个单字符串显示所有向脚本传递的参数，若以 "$@" 使用，则以 "\$1" "\$2" ... "\$n" 的形式输出
`$?`|函数调用后，用来获取函数的返回值

### 11、输入输出重定向
>命令的标准输入和标准输出默认都是终端，可通过重定向命令修改

命令|说明
---|:--:
`command > file`|将输出重定向到 file，会重写 file
`command < file`|将输入重定向到 file
`command >> file`|将输出以追加的方式重定向到 file
`command > /dev/null`|将输出写到一个特殊文件，所有写入的内容都会被丢弃

### 12、文件包含
>shell 可以包含外部脚本，这样可以方便的将一些公用的代码作为独立的文件，即 `source` 命令，其不会创建子进程
```text
. filename

source filename
```

# 参考
* 【教程】
  * http://c.biancheng.net/view/706.html
  * https://www.cnblogs.com/clsn/p/7992981.html
  * https://www.runoob.com/linux/linux-shell-io-redirections.html
* 【案例】
  * https://github.com/fengyuhetao/shell