package helper;

public class Timer {
    private long startTime;

    public Timer() {
        startTime = System.currentTimeMillis();
    }

    public long duration() {
        return System.currentTimeMillis() - startTime;
    }
}
