package a_grammar.a_basic;

/**
 * @author jay.wang
 * @date 2021-08-17 11:04
 * 操作符
 */
public class AllOps {
    public static void main(String[] args) {

    }

    // 布尔值的接收测试：
    void f(boolean b) {}
    void boolTest(boolean x, boolean y) {
        // 算数运算符：
        //- x = x * y;
        //- x = x / y;
        //- x = x % y;
        //- x = x + y;
        //- x = x - y;
        //- x++;
        //- x--;
        //- x = +y;
        //- x = -y;
        // 关系运算符和逻辑运算符：
        //- f(x > y);
        //- f(x >= y);
        //- f(x < y);
        //- f(x <= y);
        f(x == y);
        f(x != y);
        f(!y);
        x = x && y;
        x = x || y;
        // 按位运算符：
        //- x = ~y;
        x = x & y;
        x = x | y;
        x = x ^ y;
        //- x = x << 1;
        //- x = x >> 1;
        //- x = x >>> 1;
        // 联合赋值：
        //- x += y;
        //- x -= y;
        //- x *= y;
        //- x /= y;
        //- x %= y;
        //- x <<= 1;
        //- x >>= 1;
        //- x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换：
        //- char c = (char)x;
        //- byte b = (byte)x;
        //- short s = (short)x;
        //- int i = (int)x;
        //- long l = (long)x;
        //- float f = (float)x;
        //- double d = (double)x;
    }

    void charTest(char x, char y) {
        // 算数运算符：
        x = (char)(x * y);
        x = (char)(x / y);
        x = (char)(x % y);
        x = (char)(x + y);
        x = (char)(x - y);
        x++;
        x--;
        x = (char) + y;
        x = (char) - y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        x= (char)~y;
        x = (char)(x & y);
        x = (char)(x | y);
        x = (char)(x ^ y);
        x = (char)(x << 1);
        x = (char)(x >> 1);
        x = (char)(x >>> 1);
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        x <<= 1;
        x >>= 1;
        x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换
        //- boolean bl = (boolean)x;
        byte b = (byte)x;
        short s = (short)x;
        int i = (int)x;
        long l = (long)x;
        float f = (float)x;
        double d = (double)x;
    }

    void byteTest(byte x, byte y) {
        // 算数运算符：
        x = (byte)(x* y);
        x = (byte)(x / y);
        x = (byte)(x % y);
        x = (byte)(x + y);
        x = (byte)(x - y);
        x++;
        x--;
        x = (byte) + y;
        x = (byte) - y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        //按位运算符：
        x = (byte)~y;
        x = (byte)(x & y);
        x = (byte)(x | y);
        x = (byte)(x ^ y);
        x = (byte)(x << 1);
        x = (byte)(x >> 1);
        x = (byte)(x >>> 1);
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        x <<= 1;
        x >>= 1;
        x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        short s = (short)x;
        int i = (int)x;
        long l = (long)x;
        float f = (float)x;
        double d = (double)x;
    }

    void shortTest(short x, short y) {
        // 算术运算符：
        x = (short)(x * y);
        x = (short)(x / y);
        x = (short)(x % y);
        x = (short)(x + y);
        x = (short)(x - y);
        x++;
        x--;
        x = (short) + y;
        x = (short) - y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        x = (short) ~ y;
        x = (short)(x & y);
        x = (short)(x | y);
        x = (short)(x ^ y);
        x = (short)(x << 1);
        x = (short)(x >> 1);
        x = (short)(x >>> 1);
        // Compound assignment:
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        x <<= 1;
        x >>= 1;
        x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        byte b = (byte)x;
        int i = (int)x;
        long l = (long)x;
        float f = (float)x;
        double d = (double)x;
    }

    void intTest(int x, int y) {
        // 算术运算符：
        x = x * y;
        x = x / y;
        x = x % y;
        x = x + y;
        x = x - y;
        x++;
        x--;
        x = +y;
        x = -y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        x = ~y;
        x = x & y;
        x = x | y;
        x = x ^ y;
        x = x << 1;
        x = x >> 1;
        x = x >>> 1;
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        x <<= 1;
        x >>= 1;
        x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        byte b = (byte)x;
        short s = (short)x;
        long l = (long)x;
        float f = (float)x;
        double d = (double)x;
    }

    void longTest(long x, long y) {
        // 算数运算符：
        x = x * y;
        x = x / y;
        x = x % y;
        x = x + y;
        x = x - y;
        x++;
        x--;
        x = +y;
        x = -y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        x = ~y;
        x = x & y;
        x = x | y;
        x = x ^ y;
        x = x << 1;
        x = x >> 1;
        x = x >>> 1;
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        x <<= 1;
        x >>= 1;
        x >>>= 1;
        x &= y;
        x ^= y;
        x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        byte b = (byte)x;
        short s = (short)x;
        int i = (int)x;
        float f = (float)x;
        double d = (double)x;
    }

    void floatTest(float x, float y) {
        // 算数运算符：
        x = x * y;
        x = x / y;
        x = x % y;
        x = x + y;
        x = x - y;
        x++;
        x--;
        x = +y;
        x = -y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        //- x = ~y;
        //- x = x & y;
        //- x = x | y;
        //- x = x ^ y;
        //- x = x << 1;
        //- x = x >> 1;
        //- x = x >>> 1;
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        //- x <<= 1;
        //- x >>= 1;
        //- x >>>= 1;
        //- x &= y;
        //- x ^= y;
        //- x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        byte b = (byte)x;
        short s = (short)x;
        int i = (int)x;
        long l = (long)x;
        double d = (double)x;
    }

    void doubleTest(double x, double y) {
        // 算术运算符：
        x = x * y;
        x = x / y;
        x = x % y;
        x = x + y;
        x = x - y;
        x++;
        x--;
        x = +y;
        x = -y;
        // 关系和逻辑运算符：
        f(x > y);
        f(x >= y);
        f(x < y);
        f(x <= y);
        f(x == y);
        f(x != y);
        //- f(!x);
        //- f(x && y);
        //- f(x || y);
        // 按位运算符：
        //- x = ~y;
        //- x = x & y;
        //- x = x | y;
        //- x = x ^ y;
        //- x = x << 1;
        //- x = x >> 1;
        //- x = x >>> 1;
        // 联合赋值：
        x += y;
        x -= y;
        x *= y;
        x /= y;
        x %= y;
        //- x <<= 1;
        //- x >>= 1;
        //- x >>>= 1;
        //- x &= y;
        //- x ^= y;
        //- x |= y;
        // 类型转换：
        //- boolean bl = (boolean)x;
        char c = (char)x;
        byte b = (byte)x;
        short s = (short)x;
        int i = (int)x;
        long l = (long)x;
        float f = (float)x;
    }
}