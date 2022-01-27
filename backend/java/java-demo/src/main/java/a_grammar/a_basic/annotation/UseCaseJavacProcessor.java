package a_grammar.a_basic.annotation;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import java.util.Set;

// 2、注解处理器 - javac 编译器
@SupportedAnnotationTypes("a_grammar.a_basic.annotation.JavacUseCase") // 指定需要处理的注解类
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class UseCaseJavacProcessor extends AbstractProcessor { // 继承父处理器
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment env) {
        // TypeElement: 表示一个类或接口程序元素，提供关于类型及其成员的信息的访问
        // RoundEnvironment: 为注解处理器提供可以查询一轮注解处理的信息

        for (TypeElement t : annotations) {
            System.out.println(t);
        }

        for (Element el : env.getElementsAnnotatedWith(JavacUseCase.class)) {
            // Element: 表示程序元素
            display(el);
        }

        return false;
    }

    private void display(Element el) {
        System.out.println("==== " + el + " ====");
    }
}
