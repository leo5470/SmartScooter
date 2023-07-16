package com.esoe2013group1.smartscooter;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SuppressWarnings("ALL")
@Controller
public class ReactController {
    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
    public String redirectIndex(HttpServletRequest httpServletRequest){
        return "/index.html";
    }
}
