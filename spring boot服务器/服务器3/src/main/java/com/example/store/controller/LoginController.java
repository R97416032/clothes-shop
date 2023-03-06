package com.example.store.controller;

import com.example.store.entity.User;
import com.example.store.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loginPage")
@ResponseBody
public class LoginController {
    @Autowired
    public LoginService loginService;

    @PostMapping("/login")
    @ResponseBody
//登录
    public User login(@RequestBody User user)
    {
        User u=loginService.LoginCheck(user);
        if(u==null){
            u=new User();
            u.setTel("-1");
        }
        return u;
    }
//    注册页面处理
    @PostMapping("/signup")
    public int signUp(@RequestBody User user) {
        return loginService.signUp(user);
    }



}
