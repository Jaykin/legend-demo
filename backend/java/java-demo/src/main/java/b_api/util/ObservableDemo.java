package b_api.util;

import java.beans.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 观察者模式
 *      - 被观察者
 *      - 观察者(多个)
 * Refs
 *      - https://blog.csdn.net/infoworld/article/details/120354329
 * */
public class ObservableDemo {
    public static void main(String[] args) {
        // 创建被观察者对象
        ProductList productList = ProductList.getInstance();

        // 创建观察者对象
        JingDongListener jingDongListener = new JingDongListener();
        TaoBaoListener taoBaoListener = new TaoBaoListener();

        // 绑定观察者对象到被观察者中
        productList.addPropertyChangeListener(jingDongListener);
        productList.addPropertyChangeListener(taoBaoListener);

        // 被观察者触发修改
        productList.addProduct("Jay");
    }
}

/**
 * 被观察者
 *      - 需继承 Observable
 * */
class ProductList {
    private String name = "MyProductList";

    private List<String> productList = null; // 产品列表

    private static ProductList instance; // 单例

    private ProductList() {}

    // 用来支持观察者模式
    public PropertyChangeSupport pcs = new PropertyChangeSupport(this);

    public String getName() {
        return name;
    }

    /**
     * 获取单例
     * */
    public static ProductList getInstance() {
        if (instance == null) {
            instance = new ProductList();
            instance.productList = new ArrayList<>();
        }

        return instance;
    }

    /**
     * 添加观察者
     * */
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        pcs.addPropertyChangeListener(listener);
    }

    /**
     * 删除观察者
     * */
    public void removePropertyChangeListener(PropertyChangeListener listener) {
        pcs.removePropertyChangeListener(listener);
    }

    /**
     * 新增产品
     * */
    public void addProduct(String newProduct) {
        int oldTailIdx = productList.size() - 1;

        productList.add(newProduct);
        System.out.println("列表新增了产品: " + newProduct);

        pcs.firePropertyChange("productList["+oldTailIdx+"]", null, newProduct);
    }
}

/**
 * 观察者
 * */
class JingDongListener implements PropertyChangeListener {
    @Override
    public void propertyChange(PropertyChangeEvent evt) {
        String newProduct = (String) evt.getNewValue();
        ProductList source = (ProductList) evt.getSource();
        System.out.println("来自"+source.getName()+"的新产品: " + newProduct + "已同步到京东");
    }
}

class TaoBaoListener implements PropertyChangeListener {
    @Override
    public void propertyChange(PropertyChangeEvent evt) {
        String newProduct = (String) evt.getNewValue();
        ProductList source = (ProductList) evt.getSource();
        System.out.println("来自"+source.getName()+"的新产品: " + newProduct + "已同步到淘宝");
    }
}