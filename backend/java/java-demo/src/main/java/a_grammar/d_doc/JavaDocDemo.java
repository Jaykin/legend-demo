package a_grammar.d_doc;

/**
 * 所有Javadoc指令都发生在以 \/** 开头(但仍然以 *\/ 结尾)的注释中
 *
 * 嵌入HTML: <p>内嵌HTML<p/>
 * doc标签: 以 @ 开头的指令，放在注释行的开头
 *
 * 1、标记超链接到其他文档中
 * @see a_grammar.c_generics.GenericsDemo
 *
 * 2、版本信息
 * @version 1.0.0
 *
 * 3、作者信息
 * @author jay.wang
 *
 * 4、指示此代码的版本开始使用特定功能
 * @since 1.8
 * */
public class JavaDocDemo {
    /**
     * @param args 参数说明
     * @return 返回值说明
     * @throws Exception 可能抛出的异常
     * @deprecated 表明不再使用此特定功能，因为将来有可能将其删除
     * */
    public static void main(String[] args) {
        System.out.println("JavaDoc!");
    }
}
