package b_api.concurrent;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

public class ExecutorServiceDemo {
    public static void main(String[] args) {
        singleThreadExecuteTask();
    }

    // 执行/调度任务
    public static void singleThreadExecuteTask() {
        ExecutorService exec = Executors.newSingleThreadExecutor();

        // 创建 10 个任务，并交由 Executor 去执行
        IntStream.range(0, 10)
                .mapToObj(NapTask::new)
                .forEach(exec::execute);
        System.out.println("All tasks submitted");
        exec.shutdown(); // Executor 停止接收新任务

        while (!exec.isTerminated()) {
            System.out.println(Thread.currentThread().getName() + " awaiting termination");
            // 主线程 sleep
            new Nap(0.1);
        }
    }
}

// 线程 sleep 工具类
class Nap {
    public Nap(double t) {
        try {
            // 将当前线程 sleep（超时等待）
            TimeUnit.MILLISECONDS.sleep((int)(1000 * t));
        } catch(InterruptedException e){
            throw new RuntimeException(e);
        }
    }

    public Nap(double t, String msg) {
        this(t);
        System.out.println(msg);
    }
}

// 任务类
class NapTask implements Runnable {
    final int id;

    public NapTask(int id) {
        this.id = id;
    }

    @Override
    public void run() {
        new Nap(0.1); // sleep thread
        System.out.println(this + " " + Thread.currentThread().getName());
    }

    @Override
    public String toString() {
        return "NapTask[" + id + "]";
    }
}