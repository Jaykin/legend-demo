<!-- <font color="lightblue"></font> -->
## 2、对象通用的方法

> 讲述 <font color="lightblue">何时以及如何覆盖非 final 的 Object 方法</font>：equals、hashCode、toString、clone、finalize

### 2.1、覆盖 equals 时请遵守通用约定
1. 类的每个实例本质上都是唯一的
2. 类没有必要提供 "逻辑相等" 的测试功能
3. 超类已经覆盖了 equals 时，超类的行为对于子类也是合适的
4. 类是私有的，或者包级私有的，可以确定它的 equals 方法永远不会被调用

### 2.2、覆盖 equals 时总要覆盖 hashCode
> 如果不这样做的话，就会违反 hashCode 的通用约定，导致该类无法结合所有基于散列的集合一起正常运行

### 2.3、始终要覆盖 toString
> Object 的 toString 返回的是一个字符串，包含 类名称、@符号、散列码的无符号十六进制表示法；这可能并不是类的用户期望看到的

### 2.4、谨慎地覆盖 clone
> 指导如何实现一个行为良好的 clone 方法

### 2.5、考虑实现 Comparable 接口
> 类实现了 Comparable 接口，就表明它的实例具有内在的排序关系
