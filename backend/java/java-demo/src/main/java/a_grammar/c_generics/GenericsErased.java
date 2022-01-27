package a_grammar.c_generics;

import java.util.ArrayList;

/**
 * 泛型擦除
 * - List<String> 和 List<Integer> 在运行时实际上是相同的类型；它们都被擦除成原生类型 List，从而缺失某些操作能力
 * - 使用泛型边界来限制擦除程度，如：<T extend Object> 意味着 T 擦除到了 Object
 * */
public class GenericsErased {
    public static void main(String[] args) {
        System.out.println(new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass());
    }
}
