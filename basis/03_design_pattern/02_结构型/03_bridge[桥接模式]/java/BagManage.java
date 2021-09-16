/**
 * 用桥接（Bridge）模式模拟女士皮包的选购
 * 
 * 分析
 *      女士皮包有很多种，可以按用途分、按皮质分、按品牌分、按颜色分、按大小分等，存在多个维度的变化
 * 
 * 设计
 *      抽象化角色：按用途分可选钱包（Wallet）和挎包（HandBag）
 *      实现者角色：颜色、大小、...
 */

public class BagManage {
    public static void main(String[] args) {
        Bag handBag = new HandBag();
        ColorMan yellow = new Yellow();
        Size small = new Small();

        handBag.setColor(yellow);
        handBag.setSize(small);
        System.out.println(handBag.getDetail());;
    }
}

// =========================== 颜色维度 ===========================
// 实现化角色：颜色
interface ColorMan {
    String getColor();
}

// 具体实现化角色：黄色
class Yellow implements ColorMan {
    public String getColor() {
        return "yellow";
    }
}
// 具体实现化角色：红色
class Red implements ColorMan {
    public String getColor() {
        return "red";
    }
}

// =========================== 大小维度 ===========================
interface Size {
    String getSize();
}

class Small implements Size {
    public String getSize() {
        return "S";
    }
}

class Medium implements Size {
    public String getSize() {
        return "M";
    }
}

class Large implements Size {
    public String getSize() {
        return "L";
    }
}

// =========================== 大小维度 ===========================
// 抽象化角色：包
abstract class Bag {
    protected ColorMan color;
    protected Size size;

    public void setColor(ColorMan color) {
        this.color = color;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public abstract String getDetail();
}

// 扩展抽象化角色：挎包
class HandBag extends Bag {
    public String getDetail() {
        return String.format("HandBag, color: %s, size: %s", color.getColor(), size.getSize()) ;
    }
}

// 扩展抽象化角色：钱包
class Wallet extends Bag {
    public String getDetail() {
        return String.format("Wallet, color: %s, size: %s", color.getColor(), size.getSize()) ;
    }
}