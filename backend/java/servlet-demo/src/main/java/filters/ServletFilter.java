package filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * Filter
 * */
public class ServletFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        PrintWriter writer = response.getWriter();
        writer.write("ServletFilter 对请求进行处理<br/>");
        chain.doFilter(request, response);
        writer.write("ServletFilter 对响应进行处理<br/>");

        // 处理响应的后事
        writer.close();
        response.setContentType("text/html;charset=UTF-8");
    }
}
