package a_grammar.a_basic.annotation.runtime;

@TargetType(value = "RuntimeMain", useCase = @UseCase(id = 4, description = "from RuntimeMain"))
public class RuntimeMain {
    public static void main(String[] args) {
        runUseCase();
        runTargetType(RuntimeMain.class);
        runTargetType(UseCase.class);
    }

    @UseCase(id = 1, description = "Hello")
    public void useCase01() {

    }

    public static void runUseCase() {
        RuntimeProcessor.useCase(RuntimeMain.class);
    }

    public static void runTargetType(Class<?> clazz) {
        RuntimeProcessor.targetType(clazz);
    }
}
