/**
 * 并发编程
*/
import java.util.stream.*;
import java.util.concurrent.*;

public class ConcurrentPm {
    public static void main(String[] args) {
        
    }
}

// 获取当前机器的处理器数量(logicalcpu)
// 最佳线程数应为处理器的数量，因为运行该数量的任务时不需要切换上下文(并行)，如果处理器开启了超线程，也可选择开启后的逻辑cpu数量（上下文切换快,但计算能力不变）
class NumberOfProcessors {
    public static void main(String[] args) {
        System.out.println(
            Runtime.getRuntime().availableProcessors()
        );      // 1cpu -> 4核 -> 2超线程 = 8logicalcpu（最佳线程数）
    }
}

/**
 * Thread
 * - java.lang 包中的类
 * - JVM 为线程对象分配特殊区域的内存
 *      - 程序计数器
 *      - 支持 java 代码执行的栈：每个线程的栈通常在 64K 到 1M 之间
 *      - native code（本地方法代码）执行的栈
 *      - 线程本地变量的存储区域
 *      - 控制线程的状态管理变量
 * - 堆是线程共享的
 * - 线程必须绑定到操作系统，才能连接到处理器
 * - 最佳线程数取决于处理器，最多线程数取决于内存大小和操作系统的限制
 * - 线程状态
 *      - 初始(NEW) 新建一个线程对象，还未调用 start 方法
 *      - 运行(RUNNABLE) java线程中将已经准备就绪(Ready)和正在运行中(Running)的两种状态都统称为“Runnable”。准备就绪的线程会被放在线程池中等待被调用
 *      - 阻塞(BLOCKED) 是因为某种的原因而放弃了CPU的使用权，暂时的停止了运行。直到线程进入准备就绪(Ready)状态才会有机会转到运行状态
 *      - 等待(WAITING) 该状态的线程需要等待其他线程做出一些特定的动作（通知或者是中断）
 *      - 超时等待(TIME_WAITING) 该状态和上面的等待不同，他可以在指定的时间内自行返回
 *      - 终止(TERMINATED) 线程任务执行完毕
 * - 中断
 *      - 
*/
class Dummy extends Thread {
    private int count = 1;

    Dummy(int num) {
        count = num;
    }

    @Override
    public void run() {
        System.out.println("thread run " + count);
    }

    public static void main(String[] args) {
        int count = 1;
        System.out.println("thread init");

        // 开启线程执行任务
        while (count++ <= 4) {
            new Dummy(count).start();
        }

        System.out.println("thread end");
    }
}

/**
 * 线程池
 * Executor -> ExecutorService
 * - java.util.concurrent 包中的接口
 * - 用来统一管理多个线程
 * */

// 获取当前运行线程名称
class ShowThread implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}

class WorkStealingPool {
    public static void main(String[] args) {
        // 逻辑cpu数
        System.out.println(Runtime.getRuntime().availableProcessors());

        /**
         * 创建线程池
         * - newWorkStealingPool 创建逻辑cpu数同等数量的并行级别的线程池
        */
        ExecutorService exec = Executors.newWorkStealingPool();
        IntStream.range(0, 10)
            .mapToObj(n -> new ShowThread())
            .forEach(exec::execute);
//        exec.awaitTermination(1, TimeUnit.SECONDS);
    }
}

// 并行流（parallel stream）

// CompletableFutures