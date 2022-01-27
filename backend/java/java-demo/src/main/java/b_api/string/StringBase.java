package b_api.string;

public class StringBase {
    public static void main(String[] args) {
        /** String.split() **/
        String str = "a,b,c,,";
        String[] ary = str.split(",");
        // 预期大于 3，结果是 3
        System.out.println(ary.length);

        String str1 = "a";
        System.out.println(str1.split(",")[0]);

        String str2 = "";
        if (str2 != null) {
            System.out.println(1);
        } else {
            System.out.println(2);
        }
    }
}
