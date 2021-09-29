package a_grammar.b_oop.inner_class;

/**
 * @author jay.wang
 * @date 2021-08-23 10:34
 */
public class CreateInnerClass {
    public static void main(String[] args) {
        CreateInnerClass ic = new CreateInnerClass();

        // ic.ship("China");

        // ic.printDetail();

        System.out.println(ic.contents().value());
    }

    private int id = 1;

    /** 1、普通内部类 **/
    public class Contents {
        private int i = 11;

        public int value() {
            return i;
        }
    }

    public Contents getContentsInstance() {
        return new Contents();
    }

    /** 2、静态内部类 **/
    static class Destination {
        private String label;

        Destination(String whereTo) {
            label = whereTo;
        }

        String readLabel() {
            return label;
        }
    }

    public void printDetail() {
        int detailId = 2;

        /** 3、局部内部类 **/
        class Detail {
            private String detail = "this is detail.";

            void print() {
                System.out.println("Detail: id: " + id + " detailId: " + detailId + " detail: " + detail);
            }
        }

        new Detail().print();
    }

    public Contents contents() {
        /** 4、匿名内部类 **/
        return new Contents() {
            private int i = 12;

            @Override
            public int value() {
                return i;
            }
        };
    }

    public void ship(String dest) {
        Contents c = new Contents();
        Destination d = new Destination(dest);

        System.out.println(c.value());
        System.out.println(d.readLabel());
    }
}
