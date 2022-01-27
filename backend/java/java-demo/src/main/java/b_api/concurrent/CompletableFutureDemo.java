package b_api.concurrent;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class CompletableFutureDemo {
    public static void main(String[] args) {
        // demo01();
        demo02();
    }

    public static CompletableFuture<Integer> cfi(int i) {
        return CompletableFuture.completedFuture(i);
    }

    public static void demo01() {
        CompletableFuture<Machina> cfuture = CompletableFuture.completedFuture(new Machina(0))
                .thenApply(Machina::work)
                .thenApply(Machina::work)
                .thenApply(Machina::work)
                .thenApply(Machina::work);

        // 返回完成状态的值
        System.out.println(cfuture.join());
    }

    // 单个 CompletableFuture 的基本操作
    public static void demo02() {
        CompletableUtilities.showr(cfi(1));
        // 实例方法 thenRunAsync(Runnable r)
        CompletableUtilities.voidr(cfi(2).thenRunAsync(() -> System.out.println("thenRunAsync: 2" )));
        // 实例方法 thenAcceptAsync(Consumer c)
        CompletableUtilities.voidr(cfi(3).thenAcceptAsync(i -> System.out.println("thenAcceptAsync: " + i)));
        // 实例方法 thenApplyAsync(Function f)
        CompletableUtilities.showr(cfi(4).thenApplyAsync(i -> {
            System.out.println("thenApplyAsync: " + i);
            return i;
        }));
        // 实例方法 thenComposeAsync(Function f)，组合 CompletableFuture
        // CompletableUtilities.voidr(cfi(5).thenComposeAsync(i -> {
        //     System.out.println("thenComposeAsync: " + i);
        //     return cfi(i);
        // }));
        CompletableUtilities.showr(cfi(6).toCompletableFuture());


        // 静态方法 runAsync(Runnable r)
        CompletableUtilities.voidr(CompletableFuture.runAsync(() -> System.out.println("static runAsync: 10")));
        // 静态方法 supplyAsync(Supplier s)
        CompletableUtilities.showr(CompletableFuture.supplyAsync(() -> 20));
    }

    // 多个 CompletableFuture 的流程控制
    public static void demo3() {

    }
}

class Machina {
    public enum State {
        START, ONE, TWO, THREE, END;
        State step() {
            if(equals(END))
                return END;
            return values()[ordinal() + 1];
        }
    }
    private State state = State.START;
    private final int id;
    public Machina(int id) {
        this.id = id;
    }

    public static Machina work(Machina m) {
        if(!m.state.equals(State.END)){
            new Nap(0.1); // 等待 100ms
            m.state = m.state.step();
        }
        System.out.println(m);
        return m;
    }

    @Override
    public String toString() {
        return"Machina" + id + ": " +      (state.equals(State.END)? "complete" : state);
    }
}

class CompletableUtilities {
    // Get and show value stored in a CF:
    public static void showr(CompletableFuture<?> c) {
        try {
            System.out.println(c.get());
        } catch(InterruptedException
                | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
    // For CF operations that have no value:
    public static void voidr(CompletableFuture<Void> c) {
        try {
            c.get(); // Returns void
        } catch(InterruptedException
                | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}