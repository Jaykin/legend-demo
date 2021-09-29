package a_grammar.b_oop;

/**
 * @author jay.wang
 * @date 2021-08-19 18:15
 */
public class Gc {
    public static void main(String[] args) {
        Book novel = new Book(true);

        novel.checkIn();

        new Book(true);

        // 强制 GC
        System.gc();

        // 延迟 1s，保证 main 不要被推出栈
        try {
            Thread.sleep(1000);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}

class Book {
    boolean checkedOut = false;

    Book(boolean checkOut) {
        checkedOut = checkOut;
    }

    void checkIn() {
        checkedOut = false;
    }

    @Override
    protected void finalize() throws Throwable {
        if (checkedOut) {
            System.out.println("Error: checked out");
        }
    }
}
