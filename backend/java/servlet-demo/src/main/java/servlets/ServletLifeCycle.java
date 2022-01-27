package servlets;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * 生命周期
 * */
@WebServlet(urlPatterns = "/life_cycle", initParams = {
        @WebInitParam(name = "name", value = "Jay")
})
public class ServletLifeCycle extends HttpServlet {
    private int initCount = 0;
    private int httpCount = 0;
    private int destoryCount = 0;

    @Override
    public void init() throws ServletException {
        super.init();
        initCount++;
        System.out.println("调用了 init 方法：" + initCount);

        // @WebInitParam
        ServletConfig config = this.getServletConfig();
        System.out.println(config.getInitParameter("name"));
    }

    @Override
    public void destroy() {
        super.destroy();
        destoryCount++;
        System.out.println("调用了 destroy 方法：" + destoryCount);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        httpCount++;
        System.out.println("doGet方法：" + httpCount);

        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        writer.write("初始化次数:" + initCount + "<br/>" + "处理请求次数:" + httpCount + "<br/>" + "销毁次数:" + destoryCount);
        writer.close();
    }
}
