<!-- <font color="lightblue"></font> -->
## 1、创建和销毁对象

### 1.1、创建对象 - 用静态工厂方法代替构造器
> 类提供 <font color="lightblue">公有的静态工厂方法（static factory method）来创建对象</font>，而不是提供公有的构造器

#### 优势
1. 静态方法可赋予更可读的名称。如：BigInteger.probablePrime
2. 可支持缓存对象。即不用每次都创建新对象，可减少创建对象的代价；如：Boolean.True
3. 可返回原类型的子类型的对象。可隐藏实现类(子类型)；如：Collections
4. 返回的对象的类可根据参数而变化（保证是子类型即可）；如：EnumSet.noneOf
5. 在编写静态工厂方法的类时，方法返回的对象的类可以不存在（可动态加载）

#### 劣势
1. 类如果不含 public 或 protected 的构造器的话，无法被子类化
2. 不方便发现能用于实例化的静态工厂方法。可通过一些惯用名称来弥补
    - from: 类型转换方法。如：Date d = Date.from(instant);
    - of: 聚合方法。如：Set<Rank> faceCards = EnumSet.of(JACK, JAY);
    - valueOf: 另一种转换。如：BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);

### 1.2、创建对象 - 遇到多个构造器参数时要考虑使用构建器
> <font color="lightblue">使用构建器封装创建对象时需传入多个参数(多数是固定值)</font>

### 1.3、创建对象 - 使用私有构造器或者枚举类型强化 Singleton 属性
> <font color="lightblue">用于单例模式</font>

### 1.4、创建对象 - 通过私有构造器强化不可实例化的能力
> <font color="lightblue">用于不希望被实例化的工具类</font>，可将其默认构造器私有化

### 1.5、创建对象 - 优先考虑依赖（Dependency Injection）注入来引用资源
> <font color="lightblue">当创建一个新的实例时，就将该资源传到构造器中</font>

### 1.6、创建对象 - 避免创建不必要的对象
> <font color="lightblue">建议重用相同功能的对象</font>

### 1.7、销毁对象 - 消除过期的对象引用
> <font color="lightblue">避免内存泄漏</font>

### 1.8、销毁对象 - 避免使用终结方法和清除方法
> <font color="lightblue"></font>

### 1.9、销毁对象 - try-with-resources 优先于 try-finally
> <font color="lightblue"></font>